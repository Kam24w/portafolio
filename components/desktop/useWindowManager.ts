import { useMemo, useReducer } from "react";
import type { WindowId } from "./windows";

export type WindowState = {
  x: number;
  y: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

export type WindowMap = Partial<Record<WindowId, WindowState>>;

type ManagerState = {
  windows: WindowMap;
  focused: WindowId | null;
  /** z-index más alto asignado hasta ahora. */
  topZ: number;
  /** Ventanas abiertas en total (para escalonar las nuevas). */
  openedCount: number;
};

type Action =
  | { type: "open"; id: WindowId; position: (openedCount: number) => { x: number; y: number } }
  | { type: "focus"; id: WindowId }
  | { type: "close"; id: WindowId }
  | { type: "minimize"; id: WindowId }
  | { type: "toggleMaximize"; id: WindowId }
  | { type: "move"; id: WindowId; x: number; y: number };

const INITIAL_STATE: ManagerState = { windows: {}, focused: null, topZ: 10, openedCount: 0 };

function patch(state: ManagerState, id: WindowId, changes: Partial<WindowState>): ManagerState {
  const current = state.windows[id];
  if (!current) return state;
  return { ...state, windows: { ...state.windows, [id]: { ...current, ...changes } } };
}

function reducer(state: ManagerState, action: Action): ManagerState {
  switch (action.type) {
    case "open": {
      // si ya está abierta, "abrir" equivale a traerla al frente
      if (state.windows[action.id]) return reducer(state, { type: "focus", id: action.id });
      const z = state.topZ + 1;
      return {
        windows: {
          ...state.windows,
          [action.id]: { ...action.position(state.openedCount), z, minimized: false, maximized: false },
        },
        focused: action.id,
        topZ: z,
        openedCount: state.openedCount + 1,
      };
    }
    case "focus": {
      const current = state.windows[action.id];
      if (!current) return state;
      // ya está al frente: no se crea estado nuevo (evita renders extra)
      if (state.focused === action.id && current.z === state.topZ && !current.minimized) return state;
      const z = state.topZ + 1;
      return { ...patch(state, action.id, { z, minimized: false }), focused: action.id, topZ: z };
    }
    case "close": {
      if (!state.windows[action.id]) return state;
      const windows = { ...state.windows };
      delete windows[action.id];
      return { ...state, windows, focused: state.focused === action.id ? null : state.focused };
    }
    case "minimize":
      return {
        ...patch(state, action.id, { minimized: true }),
        focused: state.focused === action.id ? null : state.focused,
      };
    case "toggleMaximize": {
      const current = state.windows[action.id];
      return current ? patch(state, action.id, { maximized: !current.maximized }) : state;
    }
    case "move":
      return patch(state, action.id, { x: action.x, y: action.y, maximized: false });
  }
}

export type WindowActions = {
  open: (id: WindowId, position: (openedCount: number) => { x: number; y: number }) => void;
  focus: (id: WindowId) => void;
  close: (id: WindowId) => void;
  minimize: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  move: (id: WindowId, x: number, y: number) => void;
};

export function useWindowManager() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // `dispatch` es estable, así que estas acciones también lo son (útil para React.memo).
  const actions = useMemo<WindowActions>(
    () => ({
      open: (id, position) => dispatch({ type: "open", id, position }),
      focus: (id) => dispatch({ type: "focus", id }),
      close: (id) => dispatch({ type: "close", id }),
      minimize: (id) => dispatch({ type: "minimize", id }),
      toggleMaximize: (id) => dispatch({ type: "toggleMaximize", id }),
      move: (id, x, y) => dispatch({ type: "move", id, x, y }),
    }),
    [],
  );

  return { windows: state.windows, focused: state.focused, actions };
}
