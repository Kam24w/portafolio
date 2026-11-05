import type { PointerEvent } from "react";
import type { AppDef } from "@/components/apps";
import type { WindowState } from "./types";

type DesktopWindowProps = {
  app: AppDef;
  state: WindowState;
  onFocus: (id: AppDef["id"]) => void;
  onClose: (id: AppDef["id"]) => void;
  onMinimize: (id: AppDef["id"]) => void;
  onToggleMaximize: (id: AppDef["id"]) => void;
  onBarPointerDown: (event: PointerEvent<HTMLDivElement>, id: AppDef["id"]) => void;
};

export function DesktopWindow({
  app,
  state,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onBarPointerDown,
}: DesktopWindowProps) {
  return (
    <section
      className={`win in${state.min ? " min" : ""}${state.max ? " max" : ""}`}
      style={{ left: state.x, top: state.y, zIndex: state.z }}
      aria-label={app.name}
      onPointerDown={() => onFocus(app.id)}
    >
      <div
        className="wbar"
        onPointerDown={(event) => onBarPointerDown(event, app.id)}
        onDoubleClick={() => onToggleMaximize(app.id)}
      >
        <div className="wctl">
          <button className="wbtn b-cl" title="cerrar" aria-label={`Cerrar ${app.name}`} onClick={() => onClose(app.id)}>
            ×
          </button>
          <button
            className="wbtn b-mn"
            title="minimizar"
            aria-label={`Minimizar ${app.name}`}
            onClick={() => onMinimize(app.id)}
          >
            –
          </button>
          <button
            className="wbtn b-mx"
            title="maximizar"
            aria-label={`${state.max ? "Restaurar" : "Maximizar"} ${app.name}`}
            onClick={() => onToggleMaximize(app.id)}
          >
            +
          </button>
        </div>
        <div className="wtitle">{app.name}</div>
      </div>
      <div className="wbody">{app.content}</div>
    </section>
  );
}
