import type { ComponentType } from "react";
import type { AppId } from "./registry";
import { AboutApp } from "./AboutApp";
import { AiApp } from "./AiApp";
import { ContactApp } from "./ContactApp";
import { HomeApp } from "./HomeApp";
import { ProjectsApp } from "./ProjectsApp";
import { StackApp } from "./StackApp";
import { TestimonialsApp } from "./TestimonialsApp";
import { TimelineApp } from "./TimelineApp";

/** Contenido de cada ventana. `Record` obliga a que toda app registrada tenga su componente. */
export const APP_CONTENT: Record<AppId, ComponentType> = {
  inicio: HomeApp,
  "sobre-mi": AboutApp,
  proyectos: ProjectsApp,
  ias: AiApp,
  plugins: StackApp,
  testimonios: TestimonialsApp,
  trayectoria: TimelineApp,
  contacto: ContactApp,
};

export { APPS, WINDOW_WIDTH, type AppDef, type AppId, type WindowSize } from "./registry";
