import { useEffect, useState } from "react";

/**
 * Fecha actual que se actualiza cada `intervalMs`. Devuelve `null` en el
 * servidor y en el primer render, para no romper la hidratación.
 * Úsalo en el componente que muestra la hora, no en un padre grande:
 * así solo se re-renderiza ese componente.
 */
export function useNow(intervalMs = 1000): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
