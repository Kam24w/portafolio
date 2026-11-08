"use client";

import { useCallback, useEffect, useMemo, useRef, type CSSProperties } from "react";
import { WINDOW_WIDTH, type AppId } from "@/components/apps/registry";
import { useLocale } from "@/i18n/LocaleProvider";
import { BootScreen } from "./BootScreen";
import { DesktopContext, type DesktopContextValue } from "./DesktopContext";
import { DesktopWindow } from "./DesktopWindow";
import { Dock } from "./Dock";
import { Sidebar } from "./Sidebar";
import { useWindowManager } from "./useWindowManager";
import { BackdropTitle } from "./widgets/BackdropTitle";
import { CalendarWidget } from "./widgets/CalendarWidget";
import { HeroDecor } from "./widgets/HeroDecor";
import { ClockWidget } from "./widgets/ClockWidget";
import { ProfileFigure } from "./widgets/ProfileFigure";
import { ProjectPlayer } from "./widgets/ProjectPlayer";
import { ProjectShowcase } from "./widgets/ProjectShowcase";
import { TopBar } from "./widgets/TopBar";
import {
  WINDOW_IDS,
  getWindowSize,
  getWindowTarget,
  searchFromWindowId,
  windowIdFromSearch,
  type WindowId,
  type WindowTarget,
} from "./windows";

const FIRST_WINDOW_AFTER_MS = 1000;

/**
 * Cuánto sobresale la foto por encima del marco. El marco deja ese mismo
 * espacio libre arriba, así la cabeza queda sobre el fondo de pantalla.
 */
const POP_OUT = "clamp(36px, 8vh, 84px)";

/** Ventanas nuevas: centradas en el marco y escalonadas para que no se tapen del todo. */
function initialPosition(target: WindowTarget, openedCount: number, stageWidth: number) {
  const width = Math.min(WINDOW_WIDTH[getWindowSize(target)], stageWidth - 20);
  const cascade = openedCount % 5;
  const centered = (stageWidth - width) / 2 - 56 + cascade * 28;
  return {
    x: Math.round(Math.max(10, Math.min(centered, stageWidth - width - 10))),
    y: 20 + cascade * 24,
  };
}

export function Desktop() {
  const { t } = useLocale();
  const { windows, focused, actions } = useWindowManager();
  const screenRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);

  const openWindow = useCallback(
    (id: WindowId) => {
      const target = getWindowTarget(id);
      actions.open(id, (openedCount) => initialPosition(target, openedCount, stageRef.current?.clientWidth ?? 900));
    },
    [actions],
  );

  const desktopContext = useMemo<DesktopContextValue>(() => ({ openWindow }), [openWindow]);

  /* dock: abrir → enfocar → minimizar, como en un sistema operativo */
  const toggleFromDock = (id: WindowId) => {
    const win = windows[id];
    if (!win) openWindow(id);
    else if (focused === id && !win.minimized) actions.minimize(id);
    else actions.focus(id);
  };

  /*
   * El escritorio arranca limpio (la foto es la protagonista). Solo se abre
   * una ventana si el enlace la pide: ?app=… o ?app=proyectos&id=…
   */
  useEffect(() => {
    const requested = windowIdFromSearch(window.location.search);
    if (!requested) return;
    const timer = setTimeout(() => {
      if (getWindowTarget(requested).kind === "project") {
        openWindow("proyectos"); // contexto detrás del detalle
      }
      openWindow(requested);
    }, FIRST_WINDOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, [openWindow]);

  /* la URL refleja la ventana enfocada, para poder compartir el enlace */
  const urlSyncStarted = useRef(false);
  useEffect(() => {
    if (focused) urlSyncStarted.current = true;
    if (!urlSyncStarted.current) return; // no borrar los parámetros antes de abrir la primera ventana
    const search = searchFromWindowId(focused);
    if (window.location.search === search) return;
    window.history.replaceState(null, "", `${window.location.pathname}${search}${window.location.hash}`);
  }, [focused]);

  /* Esc cierra la ventana enfocada */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && focused) actions.close(focused);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focused, actions]);

  /* inclinación 3D con el mouse (solo con puntero fino y sin "reducir movimiento") */
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      el.style.transform = `rotateX(${(-y * 1.5).toFixed(2)}deg) rotateY(${(x * 1.5).toFixed(2)}deg)`;
    };
    const reset = () => {
      el.style.transform = "";
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", reset);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", reset);
    };
  }, []);

  /* app resaltada en el dock: un detalle de proyecto cuenta como "proyectos" */
  const focusedWindow = focused ? windows[focused] : undefined;
  let activeAppId: AppId | null = null;
  if (focused && focusedWindow && !focusedWindow.minimized) {
    const target = getWindowTarget(focused);
    activeAppId = target.kind === "app" ? target.app.id : "proyectos";
  }

  return (
    <DesktopContext value={desktopContext}>
      <BootScreen />

      <div
        ref={screenRef}
        style={{ "--pop-out": POP_OUT } as CSSProperties}
        className="relative z-1 h-dvh overflow-hidden transition-transform duration-300 will-change-transform perspective-[1400px]"
      >
        {/* marco principal: vidrio lechoso sobre el fondo de pantalla */}
        <main
          ref={stageRef}
          aria-label={t.desktop.label}
          className="absolute top-(--pop-out) right-6 bottom-11 left-14 rounded-[38px] border border-frame-border bg-frame shadow-glass backdrop-blur-xl transition-colors duration-400 max-sm:top-3 max-sm:right-2 max-sm:bottom-[84px] max-sm:left-2 max-sm:rounded-[28px]"
        >
          <BackdropTitle />
          <ProfileFigure />
          <HeroDecor />

          {/* columna izquierda */}
          <div className="absolute top-7 left-10 flex flex-col gap-5 max-sm:top-4 max-sm:left-5">
            <ClockWidget />
            <div className="max-md:hidden">
              <CalendarWidget />
            </div>
          </div>

          {/* columna derecha */}
          <div className="absolute top-5 right-5 flex w-[316px] flex-col gap-5 max-sm:w-auto">
            <TopBar />
            <div className="flex flex-col gap-4 max-lg:hidden">
              <ProjectShowcase />
              <ProjectPlayer />
            </div>
          </div>

          {WINDOW_IDS.map((id) => {
            const state = windows[id];
            return state ? <DesktopWindow key={id} windowId={id} state={state} actions={actions} /> : null;
          })}
        </main>

        <Sidebar />
        <Dock windows={windows} activeAppId={activeAppId} onWindowClick={toggleFromDock} />
      </div>
    </DesktopContext>
  );
}
