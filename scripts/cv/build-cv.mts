/**
 * Genera el CV en PDF (español e inglés) a partir de los datos del portafolio.
 *
 *   npm run cv
 *
 * 1. Arma el HTML (2 hojas A4) con template.ts: datos de data/portfolio.ts, i18n/ y content.ts.
 * 2. Lo abre en Chrome sin interfaz (protocolo DevTools) y lo imprime a PDF.
 * 3. Guarda public/cv/frayder-camilo-lopez-cv-{es,en}.pdf (lo descarga el botón "CV").
 *
 * Requiere Chrome instalado. Otra ruta: variable de entorno CHROME_PATH.
 * Necesita internet para cargar las fuentes de Google.
 */
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { CV_URL, PROFILE } from "../../data/portfolio.ts";
import { buildHtml } from "./template.ts";

const ROOT = join(import.meta.dirname, "..", "..");
const CHROME =
  process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const DEBUG_PORT = 9334;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------- impresión con Chrome (protocolo DevTools) ---------- */

/** Respuesta de un comando del protocolo DevTools. */
type CdpResponse = { id: number; result?: { data?: string }; error?: { message: string } };
type CdpSend = (method: string, params?: object) => Promise<CdpResponse>;

async function withChrome<T>(task: (send: CdpSend) => Promise<T>): Promise<T> {
  const profile = mkdtempSync(join(tmpdir(), "cv-chrome-"));
  const chrome = spawn(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ]);

  try {
    let wsUrl: string | undefined;
    for (let i = 0; i < 60 && !wsUrl; i++) {
      try {
        const targets = (await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json()) as { type: string; webSocketDebuggerUrl: string }[];
        wsUrl = targets.find((target) => target.type === "page")?.webSocketDebuggerUrl;
      } catch {
        /* Chrome todavía no responde */
      }
      if (!wsUrl) await sleep(250);
    }
    if (!wsUrl) throw new Error(`No se pudo abrir Chrome en ${CHROME}. Usa la variable CHROME_PATH.`);

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
    let nextId = 0;
    const pending = new Map<number, (response: CdpResponse) => void>();
    ws.addEventListener("message", (event) => {
      const message = JSON.parse(String(event.data)) as CdpResponse;
      pending.get(message.id)?.(message);
      pending.delete(message.id);
    });
    const send: CdpSend = (method, params = {}) =>
      new Promise<CdpResponse>((resolve) => {
        const id = ++nextId;
        pending.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });

    const result = await task(send);
    ws.close();
    return result;
  } finally {
    chrome.kill();
    await sleep(300);
    rmSync(profile, { recursive: true, force: true });
  }
}

/* ---------- main ---------- */

const photo = readFileSync(join(ROOT, "public", PROFILE.photo));
const photoDataUrl = `data:image/png;base64,${photo.toString("base64")}`;
const workDir = mkdtempSync(join(tmpdir(), "cv-html-"));
mkdirSync(join(ROOT, "public", "cv"), { recursive: true });

await withChrome(async (send) => {
  await send("Page.enable");
  for (const locale of ["es", "en"] as const) {
    const htmlPath = join(workDir, `cv-${locale}.html`);
    writeFileSync(htmlPath, buildHtml(locale, photoDataUrl));

    await send("Page.navigate", { url: pathToFileURL(htmlPath).href });
    await sleep(1500);
    await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => true)", awaitPromise: true });

    const response = await send("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    });
    const target = join(ROOT, "public", (CV_URL?.[locale] ?? `/cv/cv-${locale}.pdf`).replace(/^\//, ""));
    if (!response.result?.data) throw new Error(`Chrome no generó el PDF (${locale}): ${response.error?.message ?? "sin datos"}`);
    writeFileSync(target, Buffer.from(response.result.data, "base64"));
    console.log(`✓ ${locale}: ${target}`);
  }
});

rmSync(workDir, { recursive: true, force: true });
