/** Une clases de Tailwind ignorando las condiciones falsas: cx("a", isOn && "b"). */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
