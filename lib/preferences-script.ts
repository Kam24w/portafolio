/**
 * Claves de localStorage y script que aplica tema e idioma ANTES de que
 * React hidrate la página, para evitar el parpadeo (FOUC).
 * Este archivo no importa React: lo usa el layout (componente de servidor).
 */
export const STORAGE_KEYS = {
  theme: "fc-theme",
  locale: "fc-locale",
} as const;

export const PREFERENCES_INIT_SCRIPT = `try{var d=document.documentElement,s=localStorage,t=s.getItem("${STORAGE_KEYS.theme}"),l=s.getItem("${STORAGE_KEYS.locale}");if(t==="dark")d.dataset.theme="dark";if(l!=="es"&&l!=="en")l=/^en/i.test(navigator.language)?"en":"es";d.lang=l}catch(e){}`;
