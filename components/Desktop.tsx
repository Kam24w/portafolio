'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/Icon';
import { APPS, type AppId } from '@/components/apps';
import { CalendarWidget } from './desktop/CalendarWidget';
import { DesktopWindow } from './desktop/DesktopWindow';
import type { WindowMap } from './desktop/types';

export default function Desktop() {
  const [wins, setWins] = useState<WindowMap>({});
  const [focused, setFocused] = useState<AppId | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [booted, setBooted] = useState(false);
  const [bootGone, setBootGone] = useState(false);
  const [hintOff, setHintOff] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  const zRef = useRef(10);
  const countRef = useRef(0);
  const stageRef = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  /* ---------- reloj ---------- */
  useEffect(() => {
    const upd = () => setNow(new Date());
    upd();
    const t = setInterval(upd, 1000);
    return () => clearInterval(t);
  }, []);

  /* ---------- tema ---------- */
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    try {
      localStorage.setItem('fc-theme', next ? 'dark' : 'light');
    } catch {
      /* sin almacenamiento */
    }
  }, [dark]);

  /* ---------- boot ---------- */
  useEffect(() => {
    const t1 = setTimeout(() => setBooted(true), 1700);
    const t2 = setTimeout(() => setBootGone(true), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* ---------- tilt 3d ---------- */
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const el = screenRef.current;
    if (!el) return;
    const mv = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      el.style.transform = `rotateX(${(-y * 2).toFixed(2)}deg) rotateY(${(x * 2).toFixed(2)}deg)`;
    };
    const reset = () => {
      el.style.transform = '';
    };
    document.addEventListener('mousemove', mv);
    document.addEventListener('mouseleave', reset);
    return () => {
      document.removeEventListener('mousemove', mv);
      document.removeEventListener('mouseleave', reset);
    };
  }, []);

  /* ---------- ventanas ---------- */
  const focusWin = useCallback((id: AppId) => {
    setWins((w) => {
      const cur = w[id];
      if (!cur) return w;
      return { ...w, [id]: { ...cur, z: ++zRef.current, min: false } };
    });
    setFocused(id);
  }, []);

  const openApp = useCallback(
    (id: AppId) => {
      setNavOpen(false);
      setWins((w) => {
        if (w[id]) return w;
        const stage = stageRef.current;
        const maxL = Math.max(10, (stage?.clientWidth ?? 900) - 450);
        const n = countRef.current++;
        return {
          ...w,
          [id]: {
            x: Math.min(220 + n * 32, maxL),
            y: Math.min(16 + n * 28, 90),
            z: ++zRef.current,
            min: false,
            max: false,
          },
        };
      });
      setFocused(id);
      setHintOff(true);
    },
    [],
  );

  const closeApp = useCallback((id: AppId) => {
    setWins((w) => {
      const next = { ...w };
      delete next[id];
      return next;
    });
    setFocused((f) => (f === id ? null : f));
  }, []);

  const minApp = useCallback((id: AppId) => {
    setWins((w) => (w[id] ? { ...w, [id]: { ...w[id]!, min: true } } : w));
    setFocused((f) => (f === id ? null : f));
  }, []);

  const toggleMax = useCallback((id: AppId) => {
    setWins((w) => (w[id] ? { ...w, [id]: { ...w[id]!, max: !w[id]!.max } } : w));
  }, []);

  /* abrir "inicio" tras el boot */
  const openRef = useRef(openApp);
  useEffect(() => {
    openRef.current = openApp;
    const t = setTimeout(() => openRef.current('inicio'), 1000);
    return () => clearTimeout(t);
  }, [openApp]);

  /* esc cierra la ventana enfocada */
  const focusedRef = useRef<AppId | null>(null);
  useEffect(() => {
    focusedRef.current = focused;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focusedRef.current) closeApp(focusedRef.current);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeApp, focused]);

  /* ---------- arrastre ---------- */
  const onBarDown = (e: React.PointerEvent<HTMLDivElement>, id: AppId) => {
    if ((e.target as HTMLElement).classList.contains('wbtn')) return;
    focusWin(id);
    const bar = e.currentTarget;
    const win = bar.parentElement as HTMLElement;
    const stage = stageRef.current;
    if (!stage) return;
    const sx = e.clientX - win.offsetLeft;
    const sy = e.clientY - win.offsetTop;
    bar.setPointerCapture(e.pointerId);
    const mv = (ev: PointerEvent) => {
      const x = Math.max(0, Math.min(ev.clientX - sx, stage.clientWidth - 90));
      const y = Math.max(0, Math.min(ev.clientY - sy, stage.clientHeight - 46));
      setWins((w) => (w[id] ? { ...w, [id]: { ...w[id]!, x, y, max: false } } : w));
    };
    const up = () => {
      bar.removeEventListener('pointermove', mv);
      bar.removeEventListener('pointerup', up);
      bar.removeEventListener('pointercancel', up);
    };
    bar.addEventListener('pointermove', mv);
    bar.addEventListener('pointerup', up);
    bar.addEventListener('pointercancel', up);
  };

  const timeStr = now
    ? now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    : '--:--';
  const dateLong = now
    ? now.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })
    : '';
  const dateShort = now ? now.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }) : '';

  const skipBoot = () => {
    setBooted(true);
    setTimeout(() => setBootGone(true), 500);
  };

  return (
    <>
      {/* ---------- boot ---------- */}
      {!bootGone && (
        <div
          id="boot"
          className={booted ? 'off' : ''}
          role="button"
          tabIndex={0}
          aria-label="Omitir carga del portafolio"
          onClick={skipBoot}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') skipBoot();
          }}
        >
          <div className="boot-card">
            <div className="boot-avatar">fc</div>
            <div className="boot-title">sistema portafolio</div>
            <div className="boot-bar">
              <i />
            </div>
            <div className="boot-sub">cargando niveles… haz clic para omitir</div>
          </div>
        </div>
      )}

      <div id="scrim" className={navOpen ? 'on' : ''} onClick={() => setNavOpen(false)} />

      {/* ---------- escritorio ---------- */}
      <div id="screen" ref={screenRef}>
        <div id="workspace">
          <aside id="sidebar" className={navOpen ? 'open' : ''} aria-label="Navegación principal">
            <button
              className="slogo"
              title="inicio"
              onClick={() => {
                if (window.innerWidth <= 640) setNavOpen((v) => !v);
                else openApp('inicio');
              }}
            >
              fc
            </button>
            <div id="nav">
              {APPS.map((a) => {
                const w = wins[a.id];
                const on = !!w && !w.min && focused === a.id;
                return (
                  <button
                    key={a.id}
                    className={'sib' + (on ? ' on' : '')}
                    aria-label={a.name}
                    aria-current={on ? 'true' : undefined}
                    onClick={() => (w ? focusWin(a.id) : openApp(a.id))}
                  >
                    <Icon name={a.icon} />
                    <span className="tip">{a.name}</span>
                  </button>
                );
              })}
            </div>
            <div className="side-spacer" />
            <button className="sib" title="cambiar tema" onClick={toggleTheme}>
              <Icon name={dark ? 'sun' : 'moon'} />
            </button>
          </aside>

          <main id="stage" ref={stageRef} aria-label="Escritorio del portafolio">
            {/* widgets */}
            <div className="gw" id="w-clock">
              <div className="wc-time">{timeStr}</div>
              <div className="wc-date">{dateLong}</div>
              <div className="wc-row">
                <span className="pulse" /> abierto a oportunidades
              </div>
            </div>

            <CalendarWidget date={now} />

            <div id="w-me">
              <Image
                className="me-cut"
                src="/assets/foto.png"
                alt="Frayder Camilo Lopez"
                width={512}
                height={640}
                priority
              />
              <div className="me-badge">
                <div className="me-badge-name">frayder camilo lopez</div>
                <div className="me-badge-role">full stack developer en formación</div>
              </div>
              <div className="me-tags">
                <span className="tag">react</span>
                <span className="tag">next.js</span>
                <span className="tag">tailwind</span>
                <span className="tag">typescript</span>
              </div>
            </div>

            <div className="gw" id="w-gallery">
              <div className="gal-title">
                <Icon name="image" size={15} />
                momentos del proceso
              </div>
              <div className="gal-grid">
                <Image src="/assets/thumb1.jpg" alt="Vista previa del proyecto 1" width={100} height={100} />
                <Image src="/assets/thumb2.jpg" alt="Vista previa del proyecto 2" width={100} height={100} />
                <Image src="/assets/thumb3.jpg" alt="Vista previa del proyecto 3" width={100} height={100} />
                <Image src="/assets/thumb4.jpg" alt="Vista previa del proyecto 4" width={100} height={100} />
              </div>
              <div className="gal-foot">reemplaza estas imágenes por capturas de tus proyectos</div>
            </div>

            <div id="w-hint" className={hintOff ? 'off' : ''}>
              haz clic en los iconos del menú o de la barra para abrir las ventanas · arrastra por
              su barra de título
            </div>

            {/* ventanas */}
            {APPS.map((a) => {
              const w = wins[a.id];
              if (!w) return null;
              return (
                <DesktopWindow
                  key={a.id}
                  app={a}
                  state={w}
                  onFocus={focusWin}
                  onClose={closeApp}
                  onMinimize={minApp}
                  onToggleMaximize={toggleMax}
                  onBarPointerDown={onBarDown}
                />
              );
            })}
          </main>
        </div>

        {/* ---------- taskbar ---------- */}
        <footer id="taskbar">
          <div id="tb-apps">
            {APPS.map((a) => {
              const w = wins[a.id];
              const on = !!w && !w.min;
              return (
                <button
                  key={a.id}
                  className={'tb-app' + (on ? ' on' : '')}
                  title={a.name}
                  aria-label={a.name}
                  aria-pressed={on}
                  onClick={() => {
                    if (!w) openApp(a.id);
                    else if (focused === a.id && !w.min) minApp(a.id);
                    else focusWin(a.id);
                  }}
                >
                  <Icon name={a.icon} />
                </button>
              );
            })}
          </div>
          <div className="tb-spacer" />
          <button className="tb-app" title="cambiar tema" aria-label="cambiar tema" onClick={toggleTheme}>
            <Icon name={dark ? 'sun' : 'moon'} />
          </button>
          <div className="tb-sep" />
          <div className="tb-clock">
            <span>{timeStr}</span>
            <span>{dateShort}</span>
          </div>
        </footer>
      </div>
    </>
  );
}
