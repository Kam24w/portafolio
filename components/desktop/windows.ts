import { APPS, isAppId, type AppDef, type AppId, type WindowSize } from "@/components/apps/registry";
import { PROJECTS, isProjectId, type Project, type ProjectId } from "@/data/portfolio";

/**
 * Identificador de cualquier ventana del escritorio:
 * - una app del menú: "inicio", "proyectos", …
 * - el detalle de un proyecto: "proyecto:aura", "proyecto:nexora", …
 */
export type ProjectWindowId = `proyecto:${ProjectId}`;
export type WindowId = AppId | ProjectWindowId;

export const projectWindowId = (id: ProjectId): ProjectWindowId => `proyecto:${id}`;

/** Qué hay detrás de una ventana. Unión discriminada por `kind`. */
export type WindowTarget = { kind: "app"; app: AppDef } | { kind: "project"; project: Project };

const TARGETS = new Map<WindowId, WindowTarget>([
  ...APPS.map((app): [WindowId, WindowTarget] => [app.id, { kind: "app", app }]),
  ...PROJECTS.map((project): [WindowId, WindowTarget] => [projectWindowId(project.id), { kind: "project", project }]),
]);

/** Todas las ventanas posibles, en orden estable de renderizado. */
export const WINDOW_IDS: readonly WindowId[] = [...TARGETS.keys()];

export function getWindowTarget(id: WindowId): WindowTarget {
  const target = TARGETS.get(id);
  if (!target) throw new Error(`Ventana desconocida: ${id}`);
  return target;
}

export function getWindowSize(target: WindowTarget): WindowSize {
  return target.kind === "app" ? target.app.size : "wide";
}

/* ---------- sincronización con la URL ---------- */

/**
 * ?app=proyectos           → ventana de proyectos
 * ?app=proyectos&id=aura   → detalle del proyecto AURA
 */
export function windowIdFromSearch(search: string): WindowId | null {
  const params = new URLSearchParams(search);
  const app = params.get("app");
  const id = params.get("id");
  if (app === "proyectos" && isProjectId(id)) return projectWindowId(id);
  return isAppId(app) ? app : null;
}

export function searchFromWindowId(id: WindowId | null): string {
  if (!id) return "";
  const target = getWindowTarget(id);
  const params =
    target.kind === "project"
      ? new URLSearchParams({ app: "proyectos", id: target.project.id })
      : new URLSearchParams({ app: target.app.id });
  return `?${params}`;
}
