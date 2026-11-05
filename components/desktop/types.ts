import type { AppId } from "@/components/apps";

export type WindowState = {
  x: number;
  y: number;
  z: number;
  min: boolean;
  max: boolean;
};

export type WindowMap = Partial<Record<AppId, WindowState>>;
