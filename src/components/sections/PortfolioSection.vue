<template>
  <section class="py-section">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 lg:gap-12">
        <div class="hidden lg:block" aria-hidden="true"></div>
        <div class="glass-panel p-6 sm:p-10">
          <SectionHeader
            index="04"
            eyebrow="Selected Work"
            title="Featured Projects"
            description="A record of the work, questions, and ideas that have carried me from home into software and machine learning research."
            :center="false"
          />
        </div>
      </div>

      <!-- Projects. With the live scene, each project's picture is the framed
           photo on the wall behind the page: the image slot turns into a clear
           window over it (still clickable), and the camera walks from frame to
           frame as each row reaches the middle of the screen (data-hour). -->
      <div>
        <article
          v-for="(project, i) in projects"
          :id="projectId(project.title)"
          :key="project.title"
          :data-hour="projectHour(i)"
          @mouseenter="lightFrame(i)"
          @mouseleave="lightFrame(-1)"
          @focusin="lightFrame(i)"
          @focusout="lightFrame(-1)"
          class="project-row group grid min-h-[80vh] grid-cols-1 items-center gap-8 py-12 lg:grid-cols-2 lg:gap-16"
        >
          <!-- Image (on wide screens with the live scene, the framed picture on
               the wall takes its place - see the hotspots in scripts/scene.ts) -->
          <div
            :class="['project-slot relative cursor-pointer overflow-hidden rounded-xl lg:row-start-1', i % 2 === 1 ? 'lg:col-start-2' : 'lg:col-start-1']"
            @click="openProjectModal(i, $event.currentTarget as Element)"
          >
            <div class="project-slot__image relative aspect-4/3">
              <!-- Blurred echo fills the frame behind mismatched-aspect images
                   (e.g. a portrait phone photo) instead of leaving empty bars. -->
              <img
                :src="thumbnail(project.images[0], 960)"
                alt=""
                aria-hidden="true"
                class="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-2xl grayscale transition-all duration-500 group-hover:grayscale-0"
                loading="lazy"
              />
              <img
                :src="thumbnail(project.images[0], 960)"
                :alt="project.title"
                class="relative h-full w-full object-contain grayscale transition-all duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
            <div
              class="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <span class="flex items-center gap-1.5 rounded-lg bg-black/80 px-3 py-1.5 font-mono text-xs text-white">
                <Eye :size="12" />
                View project
              </span>
            </div>
          </div>

          <!-- Content -->
          <div :class="['glass-panel p-6 sm:p-8 lg:row-start-1', i % 2 === 1 ? 'lg:col-start-1' : 'lg:col-start-2']">
            <div class="flex items-center gap-3">
              <span class="font-mono text-sm text-fg-faint">{{ String(i + 1).padStart(2, "0") }}</span>
              <span class="font-mono text-xs uppercase tracking-widest text-primary-green/70">{{ project.category }}</span>
            </div>

            <h3 class="mb-3 mt-2 text-2xl font-bold text-fg sm:text-3xl">
              {{ project.title }}
            </h3>

            <p class="mb-5 text-sm leading-relaxed text-fg-subtle sm:text-base">
              {{ getProjectSummary(project.description) }}
            </p>

            <div class="mb-6 flex flex-wrap gap-2">
              <span
                v-for="tool in project.tools"
                :key="tool"
                class="rounded border border-border/10 px-2 py-1 font-mono text-xs text-fg-faint"
              >
                {{ tool }}
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-5">
              <button
                type="button"
                @click="openProjectModal(i, slotOf($event.currentTarget as Element))"
                class="flex items-center gap-1.5 font-mono text-sm text-fg transition-colors duration-200 hover:text-primary-green"
              >
                Details
                <ArrowRight :size="14" />
              </button>

              <a
                v-for="link in project.links"
                :key="link.name"
                :href="link.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 font-mono text-sm text-primary-green transition-colors duration-200 hover:text-primary-green-400"
              >
                {{ LINK_LABELS[link.type] }}
                <component :is="LINK_ICONS[link.type]" :size="14" />
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- MODAL -->
      <DialogRoot :open="!!selectedProject" @update:open="(open) => !open && closeProjectModal()">
        <DialogPortal>
          <!-- Lighter on wide screens: the camera has leaned in to the frame
               on the wall, and it stays visible beside the details. -->
          <DialogOverlay
            data-lenis-prevent
            class="fixed inset-0 z-90 bg-black/65 transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100 lg:bg-black/30"
          />
          <!-- A sheet: rises from the bottom on phones, stands at the right on
               wide screens. It grows out of the project's picture (see grow()). -->
          <DialogContent
            data-lenis-prevent
            data-project-sheet
            class="glass-dialog glass-dialog--flip fixed inset-x-0 bottom-0 z-100 max-h-[88vh] overflow-y-auto rounded-t-2xl shadow-2xl focus:outline-none lg:inset-x-auto lg:inset-y-4 lg:right-4 lg:max-h-none overscroll-contain lg:w-[min(36rem,calc(100%-2rem))] lg:rounded-2xl"
          >
            <div class="mx-auto mt-2.5 h-1 w-10 rounded-full bg-fg/15 lg:hidden" aria-hidden="true"></div>
            <template v-if="selectedProject">
              <!-- Header -->
              <div class="glass-dialog__header sticky top-0 z-10 flex items-center justify-between border-b border-border/10 p-6">
                <div>
                  <p class="font-mono text-xs uppercase tracking-widest text-primary-green/70">
                    {{ selectedProject.category }}
                  </p>
                  <DialogTitle class="mt-1 text-xl font-bold text-fg">
                    {{ selectedProject.title }}
                  </DialogTitle>
                </div>
                <DialogDescription class="sr-only">Project details</DialogDescription>
                <DialogClose aria-label="Close" class="text-fg-subtle transition-colors hover:text-fg">
                  <X :size="20" />
                </DialogClose>
              </div>

              <!-- Image (on wide screens with the live scene, the framed picture on
               the wall takes its place - see the hotspots in scripts/scene.ts) -->
              <div class="relative aspect-video overflow-hidden bg-surface">
                <!-- Blurred echo fills the frame behind mismatched-aspect images
                     (e.g. a portrait phone photo) instead of leaving empty bars. -->
                <img
                  :src="thumbnail(selectedProject.images[currentImageIndex], 1400)"
                  alt=""
                  aria-hidden="true"
                  class="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-2xl"
                />
                <img
                  :src="thumbnail(selectedProject.images[currentImageIndex], 1400)"
                  :alt="selectedProject.title"
                  class="relative h-full w-full object-contain"
                />

                <template v-if="selectedProject.images.length > 1">
                  <button
                    type="button"
                    aria-label="Previous image"
                    @click="prevImage"
                    class="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-black/60 text-white transition-colors duration-200 hover:bg-black/80"
                  >
                    <ChevronLeft :size="16" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    @click="nextImage"
                    class="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-black/60 text-white transition-colors duration-200 hover:bg-black/80"
                  >
                    <ChevronRight :size="16" />
                  </button>
                  <span class="absolute bottom-3 right-3 bg-black/70 px-2 py-1 font-mono text-xs text-white">
                    {{ String(currentImageIndex + 1).padStart(2, "0") }} / {{ String(selectedProject.images.length).padStart(2, "0") }}
                  </span>
                </template>
              </div>

              <!-- Details -->
              <div class="p-6 sm:p-8">
                <p class="text-sm leading-relaxed text-fg-muted sm:text-base">
                  {{ selectedDescription.intro }}
                </p>

                <div
                  v-if="selectedDescription.items.length"
                  class="mt-6 space-y-3 border-t border-border/10 pt-6"
                >
                  <div v-for="(item, i) in selectedDescription.items" :key="i" class="flex gap-3">
                    <span class="shrink-0 pt-0.5 font-mono text-xs text-primary-green">
                      {{ String(i + 1).padStart(2, "0") }}
                    </span>
                    <p class="text-sm leading-relaxed text-fg-subtle">{{ item }}</p>
                  </div>
                </div>

                <blockquote
                  v-if="selectedDescription.quote"
                  class="mt-6 border-l-2 border-primary-green/40 pl-4"
                >
                  <p class="text-sm italic leading-relaxed text-fg-muted sm:text-base">
                    &ldquo;{{ selectedDescription.quote.text }}&rdquo;
                  </p>
                  <footer class="mt-2 font-mono text-xs text-fg-faint">
                    &mdash; {{ selectedDescription.quote.attribution }}
                  </footer>
                </blockquote>

                <div class="mt-6 flex flex-wrap gap-2 border-t border-border/10 pt-6">
                  <span
                    v-for="tool in selectedProject.tools"
                    :key="tool"
                    class="border border-border/10 px-2 py-1 font-mono text-xs text-fg-faint"
                  >
                    {{ tool }}
                  </span>
                </div>

                <a
                  :href="`/projects/${slugify(selectedProject.title)}`"
                  class="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-fg transition-colors duration-200 hover:text-primary-green"
                >
                  Read the full story
                  <ArrowRight :size="14" />
                </a>

                <div class="mt-6 flex flex-wrap gap-3">
                  <AppButton
                    v-for="link in selectedProject.links"
                    :key="link.name"
                    tag="a"
                    variant="primary"
                    :href="link.link"
                  >
                    {{ link.name }}
                  </AppButton>
                </div>
              </div>
            </template>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { animate } from "motion";
import SectionHeader from "../SectionHeader.vue";
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "reka-ui";
import { Eye, ExternalLink, ArrowRight, ChevronLeft, ChevronRight, Smartphone, Code2, X } from "@lucide/vue";
import AppButton from "../AppButton.vue";
import projects from "../../data/projects";
import type { Project, ProjectLinkType } from "../../types";
import { getProjectSummary, parseDescription, type ParsedDescription } from "../../utils/projectDescription";
import { thumbnail } from "../../utils/thumbnail";
import { projectHour } from "../../scene/hours";
import { notifySceneState, sceneState, setOverlayOpen } from "../../scene/state";
import { ignoreNextPopState, onBackWhileOpen } from "../../lib/chapters";
import { setScrollLocked } from "../../lib/scroll";
import { motionOK } from "../../lib/preferences";
import { projectId, slugify } from "../../utils/slug";

const LINK_LABELS: Record<ProjectLinkType, string> = {
  site: "Live",
  code: "Code",
  ios: "iOS",
  android: "Android",
};

const LINK_ICONS: Record<ProjectLinkType, typeof ExternalLink> = {
  site: ExternalLink,
  code: Code2,
  ios: Smartphone,
  android: Smartphone,
};

const selectedProject = ref<Project | null>(null);
const currentImageIndex = ref(0);

/* THE WALL - hovering or focusing a project lights its frame on the wall. */
const lightFrame = (index: number) => {
  if (sceneState.hover === index) return;
  sceneState.hover = index;
  notifySceneState();
};

const slotOf = (el: Element) => el.closest("article")?.querySelector(".project-slot") ?? null;

/* DETAILS - the camera leans in to the frame while the details grow out of
   the picture: a real reka-ui dialog underneath (focus trap, Escape, focus
   returned to the trigger), with its own URL so Back closes it. */
let pushedHistory = false;
let origin: DOMRect | null = null;

const openProjectModal = async (index: number, source?: Element | null, from?: DOMRect) => {
  const project = projects[index];
  if (!project || selectedProject.value) return;
  selectedProject.value = project;
  currentImageIndex.value = 0;
  origin = from ?? source?.getBoundingClientRect() ?? null;

  sceneState.lean = index;
  notifySceneState();
  setOverlayOpen(true);
  setScrollLocked(true);
  // The page steps aside so the frame the camera leans toward is in view.
  document.documentElement.classList.add("project-open");

  const hash = `#${projectId(project.title)}`;
  if (location.hash !== hash) {
    history.pushState({ project: index }, "", hash);
    pushedHistory = true;
  }
  onBackWhileOpen(() => {
    closeProjectModal(false);
    return true;
  });

  await nextTick();
  requestAnimationFrame(grow);
};

/** FLIP: start the sheet at the picture's on-screen rectangle, then let it
    settle into place. Falls back to a plain fade without motion. */
function grow() {
  const sheet = document.querySelector<HTMLElement>("[data-project-sheet]");
  if (!sheet) return;
  if (!motionOK() || !origin || origin.width === 0) {
    animate(sheet, { opacity: [0, 1] }, { duration: 0.2 });
    return;
  }
  const to = sheet.getBoundingClientRect();
  const dx = origin.left + origin.width / 2 - (to.left + to.width / 2);
  const dy = origin.top + origin.height / 2 - (to.top + to.height / 2);
  const scale = Math.max(0.2, Math.min(origin.width / to.width, origin.height / to.height));
  animate(
    sheet,
    {
      transform: [`translate(${dx}px, ${dy}px) scale(${scale})`, "translate(0px, 0px) scale(1)"],
      opacity: [0.4, 1],
    },
    { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }
  );
}

/** `fromUser` is false when Back already closed it (history is moved). */
const closeProjectModal = (fromUser = true) => {
  if (!selectedProject.value) return;
  selectedProject.value = null;
  currentImageIndex.value = 0;

  // The camera leans back out before focus returns to the card.
  sceneState.lean = -1;
  notifySceneState();
  setOverlayOpen(false);
  setScrollLocked(false);
  document.documentElement.classList.remove("project-open");
  onBackWhileOpen(null);

  if (pushedHistory) {
    pushedHistory = false;
    if (fromUser) {
      ignoreNextPopState();
      history.back();
    }
  }
};

// Opened from the palette, or from a shared #project-... link.
const openFromRequest = (index: number, from?: DOMRect) => {
  const row = document.getElementById(projectId(projects[index].title));
  void openProjectModal(index, row?.querySelector(".project-slot"), from);
};
const onOpenRequest = (event: Event) => {
  const { index, origin } = (event as CustomEvent<{ index: number; origin?: DOMRect }>).detail;
  openFromRequest(index, origin);
};

onMounted(() => {
  addEventListener("portfolio:open-project", onOpenRequest);
  const pending = (window as Window & { __openProject?: number }).__openProject;
  const fromHash = projects.findIndex((p) => `#${projectId(p.title)}` === location.hash);
  if (pending !== undefined) {
    delete (window as Window & { __openProject?: number }).__openProject;
    openFromRequest(pending);
  } else if (fromHash >= 0) {
    openFromRequest(fromHash);
  }
});

onUnmounted(() => removeEventListener("portfolio:open-project", onOpenRequest));

const prevImage = () => {
  if (!selectedProject.value) return;
  const total = selectedProject.value.images.length;
  currentImageIndex.value = (currentImageIndex.value - 1 + total) % total;
};

const nextImage = () => {
  if (!selectedProject.value) return;
  const total = selectedProject.value.images.length;
  currentImageIndex.value = (currentImageIndex.value + 1) % total;
};

const selectedDescription = computed<ParsedDescription>(() =>
  selectedProject.value
    ? parseDescription(selectedProject.value.description)
    : { intro: "", items: [], quote: null }
);
</script>
