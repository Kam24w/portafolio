'use client';

import { useEffect, useState } from 'react';

const COLORS: Record<string, string> = {
  react: '#61dafb',
  'next.js': '#8888ff',
  tailwind: '#38bdf8',
  typescript: '#3178c6',
  'node.js': '#3c873a',
  postgresql: '#60a5fa',
  figma: '#a259ff',
  git: '#f05033',
  github: '#6e5494',
  'framer motion': '#dd33ee',
  'apis rest': '#22d3ee',
  sql: '#e38c00',
};

export function Chips({ items }: { items: string[] }) {
  return (
    <>
      {items.map((t) => (
        <span className="tag" key={t}>
          <i style={{ background: COLORS[t] ?? '#999' }} />
          {t}
        </span>
      ))}
    </>
  );
}

/** Número que cuenta de 0 a `to` al montarse. */
export function Stat({ to, label }: { to: number; label: string }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf = 0;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const p = Math.min((ts - t0) / 700, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);

  return (
    <div className="stat">
      <b>{n}</b>
      <span>{label}</span>
    </div>
  );
}
