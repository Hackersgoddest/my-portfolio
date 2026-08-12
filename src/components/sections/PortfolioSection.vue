<template>
  <section class="py-section">
    <div class="container-custom">
      <SectionHeader
        index="04"
        eyebrow="Selected Work"
        title="Featured Projects"
        description="A showcase of innovative solutions and creative implementations across various platforms"
      />

      <!-- Projects -->
      <div class="border-t border-border/20 dark:border-border/10">
        <article
          v-for="(project, i) in projects"
          :key="project.title"
          class="project-row group grid grid-cols-1 items-center gap-8 border-b border-border/20 dark:border-border/10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16"
        >
          <!-- Image -->
          <div
            :class="['relative cursor-pointer overflow-hidden rounded-xl', i % 2 === 1 ? 'lg:order-2' : '']"
            @click="openProjectModal(project)"
          >
            <div class="relative aspect-4/3">
              <!-- Blurred echo fills the frame behind mismatched-aspect images
                   (e.g. a portrait phone photo) instead of leaving empty bars. -->
              <img
                :src="project.images[0]"
                alt=""
                aria-hidden="true"
                class="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-2xl grayscale transition-all duration-500 group-hover:grayscale-0"
                loading="lazy"
              />
              <img
                :src="project.images[0]"
                :alt="project.title"
                class="relative h-full w-full object-contain grayscale transition-all duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
            <div
              class="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <span class="flex items-center gap-1.5 rounded-lg bg-black/70 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-sm">
                <Eye :size="12" />
                View project
              </span>
            </div>
          </div>

          <!-- Content -->
          <div :class="i % 2 === 1 ? 'lg:order-1' : ''">
            <div class="flex items-center gap-3">
              <span class="font-mono text-sm text-fg-faint">{{ String(i + 1).padStart(2, "0") }}</span>
              <span class="font-mono text-xs uppercase tracking-widest text-primary-green/70">{{ project.category }}</span>
            </div>

            <h3 class="mb-3 mt-2 text-2xl font-bold text-fg sm:text-3xl">
              {{ project.title }}
            </h3>

            <p class="mb-5 max-w-lg text-sm leading-relaxed text-fg-subtle sm:text-base">
              {{ getProjectSummary(project.description) }}
            </p>

            <div class="mb-6 flex flex-wrap gap-2">
              <span
                v-for="tool in project.tools"
                :key="tool"
                class="rounded border border-border/20 dark:border-border/10 px-2 py-1 font-mono text-xs text-fg-faint"
              >
                {{ tool }}
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-5">
              <button
                type="button"
                @click="openProjectModal(project)"
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
          <DialogOverlay
            data-lenis-prevent
            class="fixed inset-0 z-90 bg-black/80 backdrop-blur-sm transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100"
          />
          <DialogContent
            data-lenis-prevent
            class="fixed top-1/2 left-1/2 z-100 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-border/20 dark:border-border/10 bg-surface-elevated shadow-2xl focus:outline-none"
          >
            <template v-if="selectedProject">
              <!-- Header -->
              <div class="sticky top-0 z-10 flex items-center justify-between border-b border-border/20 dark:border-border/10 bg-surface-elevated p-6">
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

              <!-- Image -->
              <div class="relative aspect-video overflow-hidden bg-surface">
                <!-- Blurred echo fills the frame behind mismatched-aspect images
                     (e.g. a portrait phone photo) instead of leaving empty bars. -->
                <img
                  :src="selectedProject.images[currentImageIndex]"
                  alt=""
                  aria-hidden="true"
                  class="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-2xl"
                />
                <img
                  :src="selectedProject.images[currentImageIndex]"
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
                  class="mt-6 space-y-3 border-t border-border/20 dark:border-border/10 pt-6"
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

                <div class="mt-6 flex flex-wrap gap-2 border-t border-border/20 dark:border-border/10 pt-6">
                  <span
                    v-for="tool in selectedProject.tools"
                    :key="tool"
                    class="border border-border/20 dark:border-border/10 px-2 py-1 font-mono text-xs text-fg-faint"
                  >
                    {{ tool }}
                  </span>
                </div>

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
import { computed, ref } from "vue";
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

/* MODAL */
const openProjectModal = (project: Project) => {
  selectedProject.value = project;
  currentImageIndex.value = 0;
};

const closeProjectModal = () => {
  selectedProject.value = null;
  currentImageIndex.value = 0;
};

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

/* SUMMARY */
const getProjectSummary = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.querySelector("p")?.textContent ?? "";

  const firstSentence = text.split(".")[0];
  return firstSentence.length > 120
    ? text.slice(0, 120) + "..."
    : firstSentence + ".";
};

/* MODAL DESCRIPTION - split the raw HTML into an intro paragraph, a list of
   items, and an optional testimonial quote so the modal can lay each out
   with its own styling instead of dumping everything through v-html. A
   testimonial is authored as <blockquote>quote text<cite>attribution</cite></blockquote>. */
interface ParsedDescription {
  intro: string;
  items: string[];
  quote: { text: string; attribution: string } | null;
}

const parseDescription = (html: string): ParsedDescription => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const intro = div.querySelector("p")?.textContent?.trim() ?? "";
  const items = Array.from(div.querySelectorAll("li")).map(
    (li) => li.textContent?.trim() ?? ""
  );

  const blockquoteEl = div.querySelector("blockquote");
  let quote: ParsedDescription["quote"] = null;
  if (blockquoteEl) {
    const attribution = blockquoteEl.querySelector("cite")?.textContent?.trim() ?? "";
    const text = (blockquoteEl.textContent ?? "").replace(attribution, "").trim();
    quote = { text, attribution };
  }

  return { intro, items, quote };
};

const selectedDescription = computed<ParsedDescription>(() =>
  selectedProject.value
    ? parseDescription(selectedProject.value.description)
    : { intro: "", items: [], quote: null }
);
</script>
