"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { WINDOW_WIDTH, type AppId } from "@/components/apps/registry";
import { useLocale } from "@/i18n/LocaleProvider";
import { BootScreen } from "./BootScreen";
import { DesktopContext, type DesktopContextValue } from "./DesktopContext";
import { DesktopWindow } from "./DesktopWindow";
import { Sidebar } from "./Sidebar";
import { Taskbar } from "./Taskbar";
import { useWindowManager } from "./useWindowManager";
import { CalendarWidget, ClockWidget, DesktopHint, GalleryWidget, ProfileFigure } from "./widgets";
import {
  WINDOW_IDS,
  getWindowSize,
  getWindowTarget,
  searchFromWindowId,
  windowIdFromSearch,
  type WindowId,
  type WindowTarget,
} from "./windows";

/** Mismo punto de corte que el prefijo `max-sm:` de Tailwind (40rem = 640px). */
const MOBILE_QUERY = "(width < 40rem)";
const FIRST_WINDOW_AFTER_MS = 1000;

/** Posición inicial de una ventana nueva, escalonada según cuántas se han abierto. */
function initialPosition(target: WindowTarget, openedCount: number, stageWidth: number) {
  const width = WINDOW_WIDTH[getWindowSize(target)];
  const maxLeft = Math.max(10, stageWidth - width);

  if (target.kind === "project") {
    return { x: Math.min(260 + openedCount * 32, maxLeft), y: Math.min(28 + openedCount * 24, 100) };
  }
  if (target.app.id === "inicio") {
    return { x: Math.min(150 + openedCount * 32, maxLeft), y: 112 };
  }
  return { x: Math.min(220 + openedCount * 32, maxLeft), y: Math.min(16 + openedCount * 28, 90) };
}

export function Desktop() {
  const { t } = useLocale();
  const { windows, focused, actions } = useWindowManager();
  const [navOpen, setNavOpen] = useState(false);
  const [hintHidden, setHintHidden] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);

  const openWindow = useCallback(
    (id: WindowId) => {
      setNavOpen(false);
      setHintHidden(true);
      const target = getWindowTarget(id);
      actions.open(id, (openedCount) => initialPosition(target, openedCount, stageRef.current?.clientWidth ?? 900));
    },
    [actions],
  );

  const desktopContext = useMemo<DesktopContextValue>(() => ({ openWindow }), [openWindow]);

  /* barra de tareas: abrir → enfocar → minimizar, como en un sistema operativo */
  const toggleFromTaskbar = (id: WindowId) => {
    const win = windows[id];
    if (!win) openWindow(id);
    else if (focused === id && !win.minimized) actions.minimize(id);
    else actions.focus(id);
  };

  /* primera ventana: la que pida la URL (?app=…&id=…) o "inicio" */
  useEffect(() => {
    const requested = windowIdFromSearch(window.location.search);
    const timer = setTimeout(() => {
      if (requested && getWindowTarget(requested).kind === "project") {
        openWindow("proyectos"); // contexto detrás del detalle
      }
      openWindow(requested ?? "inicio");
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

  /* Esc: primero cierra el menú móvil; si no, la ventana enfocada */
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (navOpen) setNavOpen(false);
      else if (focused) actions.close(focused);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navOpen, focused, actions]);

  /* inclinación 3D con el mouse (solo con puntero fino y sin "reducir movimiento") */
  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      el.style.transform = `rotateX(${(-y * 2).toFixed(2)}deg) rotateY(${(x * 2).toFixed(2)}deg)`;
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

  const handleLogoClick = () => {
    if (window.matchMedia(MOBILE_QUERY).matches) setNavOpen((open) => !open);
    else openWindow("inicio");
  };

  /* app resaltada en el menú lateral: un detalle de proyecto cuenta como "proyectos" */
  const focusedWindow = focused ? windows[focused] : undefined;
  let activeAppId: AppId | null = null;
  if (focused && focusedWindow && !focusedWindow.minimized) {
    const target = getWindowTarget(focused);
    activeAppId = target.kind === "app" ? target.app.id : "proyectos";
  }

  return (
    <DesktopContext value={desktopContext}>
      <BootScreen />

      {navOpen && (
        <div aria-hidden="true" onClick={() => setNavOpen(false)} className="fixed inset-0 z-80 bg-[#0a0a19]/40 sm:hidden" />
      )}

      <div ref={screenRef} className="relative z-1 flex h-dvh flex-col transition-transform duration-300 will-change-transform">
        <div className="flex min-h-0 flex-1">
          <Sidebar open={navOpen} activeId={activeAppId} onLogoClick={handleLogoClick} onAppClick={openWindow} />

          <main ref={stageRef} aria-label={t.desktop.label} className="relative min-w-0 flex-1 overflow-hidden perspective-[1400px]">
            <ClockWidget />
            <CalendarWidget />
            <ProfileFigure />
            <GalleryWidget />
            <DesktopHint hidden={hintHidden} />

            {WINDOW_IDS.map((id) => {
              const state = windows[id];
              return state ? <DesktopWindow key={id} windowId={id} state={state} actions={actions} /> : null;
            })}
          </main>
        </div>

        <Taskbar windows={windows} onWindowClick={toggleFromTaskbar} />
      </div>
    </DesktopContext>
  );
}
