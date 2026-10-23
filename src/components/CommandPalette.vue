<template>
  <DialogRoot :open="open" @update:open="(v) => emit('update:open', v)">
    <DialogPortal>
      <DialogOverlay
        data-lenis-prevent
        class="fixed inset-0 z-90 bg-black/65 transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100"
      />
      <DialogContent
        data-lenis-prevent
        data-palette
        class="palette-box glass-dialog glass-dialog--flip fixed left-1/2 z-100 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl shadow-2xl focus:outline-none"
        @open-auto-focus.prevent="focusInput"
      >
        <DialogTitle class="sr-only">Go anywhere</DialogTitle>
        <DialogDescription class="sr-only">
          Travel to a part of the day, open a project, change the scene, or get in touch
        </DialogDescription>

        <!-- Search -->
        <div class="flex items-center gap-3 border-b border-border/10 px-4 py-3">
          <span class="font-mono text-primary-green">&gt;</span>
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            :aria-activedescendant="filtered[selectedIndex] ? `cmd-${filtered[selectedIndex].id}` : undefined"
            placeholder="Where to? Try 'school' or 'email'"
            class="w-full bg-transparent font-mono text-sm text-fg placeholder-fg-faint focus:outline-none"
            @keydown="handleKeydown"
          />
          <kbd class="rounded border border-border/10 px-1.5 py-0.5 font-mono text-[10px] text-fg-faint">esc</kbd>
        </div>

        <!-- Results -->
        <div id="palette-results" role="listbox" class="min-h-0 flex-1 overflow-y-auto py-2">
          <template v-if="filtered.length">
            <template v-for="(cmd, i) in filtered" :key="cmd.id">
              <div
                v-if="i === 0 || filtered[i - 1].group !== cmd.group"
                role="presentation"
                class="px-4 pt-3 pb-1.5 font-mono text-[10px] uppercase tracking-widest text-fg-faint"
              >
                {{ cmd.group }}
              </div>
              <button
                :id="`cmd-${cmd.id}`"
                type="button"
                role="option"
                :aria-selected="i === selectedIndex"
                tabindex="-1"
                @click="runCommand(i)"
                @mouseenter="selectedIndex = i"
                :class="[
                  'flex w-full items-center gap-3 px-4 py-2.5 text-left font-mono text-sm transition-colors duration-100',
                  i === selectedIndex ? 'bg-primary-green/10 text-primary-green' : 'text-fg-muted',
                ]"
              >
                <span class="flex w-5 shrink-0 justify-center">
                  <component :is="cmd.glyph" :size="14" class="h-3.5 w-3.5 text-fg-faint" />
                </span>
                <span class="flex-1 truncate">{{ cmd.label }}</span>
                <span v-if="cmd.hint" class="shrink-0 text-xs text-fg-faint">{{ cmd.hint }}</span>
              </button>
            </template>
          </template>
          <p v-else class="px-4 py-6 text-center font-mono text-sm text-fg-faint">No matches for "{{ query }}"</p>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, type Component } from "vue";
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription } from "reka-ui";
import { Mail, Download, Check, Sunrise, MapPin, Frame, EyeOff, Pause, Play, Send } from "@lucide/vue";
import LogoGithub from "~icons/ri/github-fill";
import LogoLinkedin from "~icons/ri/linkedin-box-fill";
import sections from "../data/navigation";
import projects from "../data/projects";
import { formatHour, HOURS, projectHour } from "../scene/hours";
import { setOverlayOpen } from "../scene/state";
import { navigateTo } from "../lib/chapters";
import { animate } from "motion";
import { motionOK } from "../lib/preferences";
import { isStill, onMotionPreferenceChange, setStill } from "../lib/preferences";
import { projectId } from "../utils/slug";

interface Command {
  id: string;
  group: "Go to" | "Projects" | "Scene" | "Contact";
  label: string;
  hint?: string;
  glyph: Component;
  /** Extra words that should also match the search. */
  keywords?: string;
  /** Close the palette first (travel happens after it has gone). */
  closeFirst?: boolean;
  run: () => void | Promise<void>;
}

const props = withDefaults(defineProps<{ open?: boolean; origin?: HTMLElement | null }>(), { open: false, origin: null });
const emit = defineEmits<{ "update:open": [value: boolean] }>();

const query = ref("");
const selectedIndex = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);
const copied = ref(false);
const still = ref(false);

onMounted(() => {
  still.value = isStill();
  onMotionPreferenceChange(() => (still.value = isStill()));
});

const close = () => emit("update:open", false);

const travel = (id: string, then?: () => void) => () => navigateTo(id, { then });

const openWindow = (url: string) => () => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const commands = computed<Command[]>(() => [
  ...sections.map<Command>((s) => ({
    id: `go-${s.key}`,
    group: "Go to",
    label: s.label,
    hint: formatHour(s.hour),
    glyph: MapPin,
    closeFirst: true,
    run: travel(s.key),
  })),
  {
    id: "back-to-dawn",
    group: "Go to",
    label: "Back to dawn",
    hint: formatHour(HOURS.hero),
    glyph: Sunrise,
    keywords: "top home start",
    closeFirst: true,
    run: travel("home"),
  },
  ...projects.map<Command>((project, i) => ({
    id: `project-${i}`,
    group: "Projects",
    label: project.title,
    hint: formatHour(projectHour(i)),
    glyph: Frame,
    keywords: `${project.category} ${project.tools.join(" ")}`,
    closeFirst: true,
    // Walk to its frame on the wall, then open it.
    run: travel(projectId(project.title), () => {
      // The projects island may still be hydrating: leave a note it reads on
      // mount, and tell it directly in case it's already listening.
      (window as Window & { __openProject?: number }).__openProject = i;
      window.dispatchEvent(new CustomEvent("portfolio:open-project", { detail: { index: i } }));
      setTimeout(() => delete (window as Window & { __openProject?: number }).__openProject, 1500);
    }),
  })),
  {
    id: "eyes",
    group: "Scene",
    label: "Close your eyes",
    glyph: EyeOff,
    keywords: "dawn parents memory",
    closeFirst: true,
    run: () => {
      window.dispatchEvent(new CustomEvent("portfolio:toggle-eyes"));
    },
  },
  {
    id: "still",
    group: "Scene",
    label: still.value ? "Turn motion back on" : "Still mode (stop motion)",
    glyph: still.value ? Play : Pause,
    keywords: "reduce motion animation accessibility",
    run: () => {
      setStill(!isStill());
      close();
    },
  },
  {
    id: "copy-email",
    group: "Contact",
    label: copied.value ? "Copied to clipboard" : "Copy email address",
    glyph: copied.value ? Check : Mail,
    keywords: "mail contact",
    run: async () => {
      await navigator.clipboard.writeText("frankoppongkonadu930@gmail.com");
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
        close();
      }, 600);
    },
  },
  {
    id: "send-message",
    group: "Contact",
    label: "Send a message",
    hint: formatHour(HOURS.contact),
    glyph: Send,
    closeFirst: true,
    run: travel("contact"),
  },
  {
    id: "github",
    group: "Contact",
    label: "Open GitHub",
    glyph: LogoGithub,
    run: openWindow("https://github.com/Hackersgoddest"),
  },
  {
    id: "linkedin",
    group: "Contact",
    label: "Open LinkedIn",
    glyph: LogoLinkedin,
    run: openWindow("https://www.linkedin.com/in/frank-oppong-9286b523b/"),
  },
  {
    id: "cv",
    group: "Contact",
    label: "Download CV",
    glyph: Download,
    keywords: "resume",
    run: openWindow("https://drive.google.com/file/d/111tHR99S6vjlGwYtHTkxhDj1D3d84R_w/view?usp=sharing"),
  },
]);

const filtered = computed<Command[]>(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return commands.value;
  return commands.value.filter((c) => `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase().includes(q));
});

const runCommand = async (i: number) => {
  const command = filtered.value[i];
  if (!command) return;
  if (command.closeFirst) {
    // Let the palette leave before the camera moves.
    close();
    await new Promise((resolve) => setTimeout(resolve, 220));
  }
  await command.run();
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
    void runCommand(selectedIndex.value);
  }
};

const focusInput = () => inputRef.value?.focus();

/** The palette grows out of the button that opened it (FLIP). */
function growFromOrigin() {
  const panel = document.querySelector<HTMLElement>("[data-palette]");
  const from = props.origin?.getBoundingClientRect();
  if (!panel) return;
  if (!motionOK() || !from) {
    animate(panel, { opacity: [0, 1] }, { duration: 0.15 });
    return;
  }
  const to = panel.getBoundingClientRect();
  if (to.width === 0 || to.height === 0) return;
  const dx = from.left + from.width / 2 - (to.left + to.width / 2);
  const dy = from.top + from.height / 2 - (to.top + to.height / 2);
  animate(
    panel,
    {
      // Explicit end values: Motion reads a "none" end state as scale(0).
      transform: [
        `translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height})`,
        "translate(0px, 0px) scale(1, 1)",
      ],
      opacity: [0, 1],
      borderRadius: ["999px", "16px"],
    },
    { duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }
  );
}

watch(query, () => {
  selectedIndex.value = 0;
});

// While open, the scene stops redrawing behind it.
watch(
  () => props.open,
  async (isOpen, wasOpen) => {
    if (isOpen !== !!wasOpen) setOverlayOpen(isOpen);
    if (isOpen) {
      query.value = "";
      selectedIndex.value = 0;
      await nextTick();
      focusInput();
      requestAnimationFrame(growFromOrigin);
    }
  },
  { immediate: true }
);
</script>
