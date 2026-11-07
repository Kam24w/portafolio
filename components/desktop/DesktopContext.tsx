"use client";

import { createContext, useContext } from "react";
import type { WindowId } from "./windows";

export type DesktopContextValue = {
  /** Abre una ventana o, si ya está abierta, la trae al frente. */
  openWindow: (id: WindowId) => void;
};

export const DesktopContext = createContext<DesktopContextValue | null>(null);

export function useDesktop(): DesktopContextValue {
  const value = useContext(DesktopContext);
  if (!value) throw new Error("useDesktop debe usarse dentro de <Desktop>");
  return value;
}
