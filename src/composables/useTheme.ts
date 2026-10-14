import { onMounted, ref, watch } from "vue";

export type Theme = "dark" | "light";

const STORAGE_KEY = "portfolio-theme";

// Starts as "dark" to match the server-rendered markup. The real theme is
// already on <html data-theme> (applied by the inline <head> script before
// first paint) and is synced in on mount, so hydration never sees a mismatch.
const theme = ref<Theme>("dark");
let synced = false;

function syncFromDocument() {
  if (synced) return;
  synced = true;

  theme.value = document.documentElement.dataset.theme === "light" ? "light" : "dark";

  watch(theme, (value) => {
    document.documentElement.dataset.theme = value;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage can be unavailable (private mode, blocked site data).
    }
  });
}

export function useTheme() {
  onMounted(syncFromDocument);

  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  };

  return { theme, toggleTheme };
}
