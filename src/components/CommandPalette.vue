<template>
  <DialogRoot :open="open" @update:open="(v) => emit('update:open', v)">
    <DialogPortal>
      <DialogOverlay
        data-lenis-prevent
        class="fixed inset-0 z-90 bg-black/70 backdrop-blur-sm transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100"
      />
      <DialogContent
        data-lenis-prevent
        class="fixed left-1/2 top-28 z-100 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-border/20 dark:border-border/10 bg-surface-elevated shadow-2xl focus:outline-none"
        @open-auto-focus.prevent="focusInput"
      >
        <DialogTitle class="sr-only">Command palette</DialogTitle>
        <DialogDescription class="sr-only">Search for a section to jump to, or an action to run</DialogDescription>

        <!-- Search -->
        <div class="flex items-center gap-3 border-b border-border/20 dark:border-border/10 px-4 py-3">
          <span class="font-mono text-primary-green">&gt;</span>
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            placeholder="Type a command or search..."
            class="w-full bg-transparent font-mono text-sm text-fg placeholder-fg-faint focus:outline-none"
            @keydown="handleKeydown"
          />
          <kbd class="rounded border border-border/20 dark:border-border/10 px-1.5 py-0.5 font-mono text-[10px] text-fg-faint">esc</kbd>
        </div>

        <!-- Results -->
        <div class="max-h-80 overflow-y-auto py-2">
          <template v-if="filtered.length">
            <template v-for="(cmd, i) in filtered" :key="cmd.id">
              <div
                v-if="i === 0 || filtered[i - 1].group !== cmd.group"
                class="px-4 pt-3 pb-1.5 font-mono text-[10px] uppercase tracking-widest text-fg-faint"
              >
                {{ cmd.group }}
              </div>
              <button
                type="button"
                @click="runCommand(i)"
                @mouseenter="selectedIndex = i"
                :class="[
                  'flex w-full items-center gap-3 px-4 py-2.5 text-left font-mono text-sm transition-colors duration-100',
                  i === selectedIndex ? 'bg-primary-green/10 text-primary-green' : 'text-fg-muted',
                ]"
              >
                <span v-if="cmd.commandIndex" class="w-5 shrink-0 text-xs text-fg-faint">{{ cmd.commandIndex }}</span>
                <span v-else class="flex w-5 shrink-0 justify-center">
                  <component :is="cmd.glyph" :size="14" class="h-3.5 w-3.5 text-fg-faint" />
                </span>
                {{ cmd.label }}
              </button>
            </template>
          </template>
          <p v-else class="px-4 py-6 text-center font-mono text-sm text-fg-faint">
            No matches for "{{ query }}"
          </p>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch, type Component } from "vue";
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "reka-ui";
import { Mail, Download, Check, Sun, Moon } from "@lucide/vue";
import { LogoGithub, LogoLinkedin } from "@vicons/ionicons5";
import sections from "../data/navigation";
import { useTheme } from "../composables/useTheme";

interface BaseCommand {
  id: string;
  label: string;
  run: () => void | Promise<void>;
}

interface NavCommand extends BaseCommand {
  group: "Navigate";
  commandIndex: string;
  glyph?: undefined;
}

interface ActionCommand extends BaseCommand {
  group: "Actions";
  commandIndex?: undefined;
  glyph: Component;
}

type Command = NavCommand | ActionCommand;

const props = withDefaults(defineProps<{ open?: boolean }>(), { open: false });
const emit = defineEmits<{
  "update:open": [value: boolean];
  navigate: [key: string];
}>();

const { theme, toggleTheme } = useTheme();

const query = ref("");
const selectedIndex = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);
const copied = ref(false);

const close = () => emit("update:open", false);

const navCommands = computed<NavCommand[]>(() =>
  sections.map((s) => ({
    id: `nav-${s.key}`,
    group: "Navigate",
    commandIndex: s.index,
    label: s.label,
    run: () => {
      emit("navigate", s.key);
      close();
    },
  }))
);

const actionCommands = computed<ActionCommand[]>(() => [
  {
    id: "copy-email",
    group: "Actions",
    glyph: copied.value ? Check : Mail,
    label: copied.value ? "Copied to clipboard" : "Copy email address",
    run: async () => {
      await navigator.clipboard.writeText("frankoppongkonadu930@gmail.com");
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
        close();
      }, 500);
    },
  },
  {
    id: "github",
    group: "Actions",
    glyph: LogoGithub,
    label: "Open GitHub",
    run: () => {
      window.open("https://github.com/Hackersgoddest", "_blank", "noopener,noreferrer");
      close();
    },
  },
  {
    id: "linkedin",
    group: "Actions",
    glyph: LogoLinkedin,
    label: "Open LinkedIn",
    run: () => {
      window.open("https://www.linkedin.com/in/frank-oppong-9286b523b/", "_blank", "noopener,noreferrer");
      close();
    },
  },
  {
    id: "cv",
    group: "Actions",
    glyph: Download,
    label: "Download CV",
    run: () => {
      window.open(
        "https://drive.google.com/file/d/111tHR99S6vjlGwYtHTkxhDj1D3d84R_w/view?usp=sharing",
        "_blank",
        "noopener,noreferrer"
      );
      close();
    },
  },
  {
    id: "toggle-theme",
    group: "Actions",
    glyph: theme.value === "dark" ? Sun : Moon,
    label: theme.value === "dark" ? "Switch to light mode" : "Switch to dark mode",
    run: () => {
      toggleTheme();
      close();
    },
  },
]);

const allCommands = computed<Command[]>(() => [...navCommands.value, ...actionCommands.value]);

const filtered = computed<Command[]>(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return allCommands.value;
  return allCommands.value.filter((c) => c.label.toLowerCase().includes(q));
});

const runCommand = (i: number) => {
  filtered.value[i]?.run();
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    selectedIndex.value = Math.min(selectedIndex.value + 1, filtered.value.length - 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else if (e.key === "Enter") {
    e.preventDefault();
    runCommand(selectedIndex.value);
  }
};

const focusInput = () => inputRef.value?.focus();

watch(query, () => {
  selectedIndex.value = 0;
});

watch(
  () => props.open,
  async (isOpen: boolean) => {
    if (isOpen) {
      query.value = "";
      selectedIndex.value = 0;
      await nextTick();
      focusInput();
    }
  }
);
</script>
