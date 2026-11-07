"use client";

import { memo, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { APP_CONTENT, type WindowSize } from "@/components/apps";
import { ProjectDetailApp } from "@/components/apps/ProjectDetailApp";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import type { WindowActions, WindowState } from "./useWindowManager";
import { getWindowSize, getWindowTarget, type WindowId, type WindowTarget } from "./windows";

/** Margen mínimo de la barra de título que siempre queda visible al arrastrar. */
const DRAG_KEEP_VISIBLE = { x: 90, y: 46 } as const;

const WIDTH_CLASS = {
  default: "w-[min(430px,calc(100%-20px))]",
  wide: "w-[min(560px,calc(100%-20px))]",
} as const satisfies Record<WindowSize, string>;

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

/** Contenido de la ventana según su tipo (app del menú o detalle de proyecto). */
function WindowContent({ target }: { target: WindowTarget }) {
  if (target.kind === "project") return <ProjectDetailApp project={target.project} />;
  const Content = APP_CONTENT[target.app.id];
  return <Content />;
}

type DesktopWindowProps = {
  windowId: WindowId;
  state: WindowState;
  actions: WindowActions;
};

export const DesktopWindow = memo(function DesktopWindow({ windowId, state, actions }: DesktopWindowProps) {
  const { t } = useLocale();
  const windowRef = useRef<HTMLElement>(null);
  const target = getWindowTarget(windowId);
  const size = getWindowSize(target);
  const title = target.kind === "app" ? t.apps[target.app.id] : target.project.name;

  const handleBarPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    if (event.target instanceof Element && event.target.closest("button")) return;

    const win = windowRef.current;
    const stage = win?.offsetParent;
    if (!win || !(stage instanceof HTMLElement)) return;

    const offsetX = event.clientX - win.offsetLeft;
    const offsetY = event.clientY - win.offsetTop;
    const bar = event.currentTarget;
    bar.setPointerCapture(event.pointerId);

    const move = (moveEvent: PointerEvent) => {
      actions.move(
        windowId,
        clamp(moveEvent.clientX - offsetX, 0, stage.clientWidth - DRAG_KEEP_VISIBLE.x),
        clamp(moveEvent.clientY - offsetY, 0, stage.clientHeight - DRAG_KEEP_VISIBLE.y),
      );
    };
    const stop = () => {
      bar.removeEventListener("pointermove", move);
      bar.removeEventListener("pointerup", stop);
      bar.removeEventListener("pointercancel", stop);
    };

    bar.addEventListener("pointermove", move);
    bar.addEventListener("pointerup", stop);
    bar.addEventListener("pointercancel", stop);
  };

  const controls = [
    { label: t.window.close, symbol: "×", hover: "group-hover:bg-[#ff5f57] group-focus-within:bg-[#ff5f57]", onClick: () => actions.close(windowId) },
    { label: t.window.minimize, symbol: "–", hover: "group-hover:bg-[#febc2e] group-focus-within:bg-[#febc2e]", onClick: () => actions.minimize(windowId) },
    {
      label: state.maximized ? t.window.restore : t.window.maximize,
      symbol: "+",
      hover: "group-hover:bg-[#28c840] group-focus-within:bg-[#28c840]",
      onClick: () => actions.toggleMaximize(windowId),
    },
  ];

  return (
    <section
      ref={windowRef}
      aria-label={title}
      onPointerDown={() => actions.focus(windowId)}
      style={
        state.maximized
          ? { zIndex: state.z }
          : // el alto máximo descuenta la posición, para que la ventana nunca quede cortada por abajo
            { left: state.x, top: state.y, zIndex: state.z, maxHeight: `calc(100% - ${state.y + 12}px)` }
      }
      className={cx(
        "group absolute flex-col overflow-hidden rounded-[18px] border border-glass-border bg-glass-strong shadow-glass backdrop-blur-[28px]",
        // animación de apertura (y al restaurar desde minimizado) con @starting-style
        "transition-[opacity,scale,translate,background-color,border-color] duration-300 ease-[cubic-bezier(.2,.9,.3,1.15)]",
        "starting:translate-y-3.5 starting:scale-92 starting:opacity-0 motion-reduce:transition-none",
        state.minimized ? "hidden" : "flex",
        state.maximized
          ? "top-3 left-3 h-[calc(100%-24px)] w-[calc(100%-24px)]"
          : WIDTH_CLASS[size],
      )}
    >
      <div
        onPointerDown={handleBarPointerDown}
        onDoubleClick={() => actions.toggleMaximize(windowId)}
        className="flex cursor-grab touch-none items-center gap-2 border-b border-glass-border bg-tint/7 px-[13px] py-[11px] select-none active:cursor-grabbing"
      >
        <div className="flex gap-[7px]">
          {controls.map((control) => (
            <button
              key={control.symbol}
              type="button"
              title={control.label}
              aria-label={`${control.label} ${title}`}
              onClick={control.onClick}
              className={cx(
                "relative size-[13px] rounded-full bg-glass-border text-center text-[9px] leading-[13px] text-transparent transition duration-150",
                "group-hover:text-black/55 group-focus-within:text-black/55",
                "after:absolute after:-inset-1.5", // área táctil más grande que el punto visible
                control.hover,
              )}
            >
              {control.symbol}
            </button>
          ))}
        </div>
        <div className="pointer-events-none ml-[5px] flex-1 text-[13px] font-semibold text-fg-muted">{title}</div>
      </div>
      <div
        className={cx(
          "scrollbar-glass @container flex-1 overflow-y-auto leading-[1.65] text-fg-muted",
          size === "wide" && target.kind === "app" ? "p-6 text-[15px]" : "p-[18px] text-sm",
        )}
      >
        <WindowContent target={target} />
      </div>
    </section>
  );
});
