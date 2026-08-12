<template>
  <section class="py-section">
    <div class="container-custom">
      <SectionHeader
        index="02"
        eyebrow="What I Do"
        title="Services"
        description="Comprehensive solutions from web applications to mobile apps and desktop software"
      />

      <!-- Services -->
      <div class="border-t border-border/20 dark:border-border/10">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          class="service-row group -mx-2 grid grid-cols-1 gap-4 border-b border-border/20 dark:border-border/10 px-2 py-8 transition-colors duration-300 hover:bg-fg/2 sm:-mx-4 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-8 sm:px-4"
        >
          <span
            class="font-mono text-sm text-fg-faint transition-colors duration-300 group-hover:text-primary-green"
          >
            {{ String(i + 1).padStart(2, "0") }}
          </span>

          <div>
            <h3 class="mb-2 flex items-center gap-3 text-xl font-bold text-fg sm:text-2xl">
              <component :is="service.icon" :size="20" class="text-primary-green" />
              {{ service.title }}
            </h3>
            <p class="max-w-xl text-sm leading-relaxed text-fg-subtle sm:text-base">
              {{ service.description }}
            </p>
          </div>

          <div class="flex flex-wrap gap-2 sm:max-w-56 sm:justify-end">
            <span
              v-for="tool in service.tools"
              :key="tool"
              class="rounded border border-border/20 dark:border-border/10 px-2 py-1 font-mono text-xs text-fg-faint"
            >
              {{ tool }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeader from "../SectionHeader.vue";
import services from "../../data/services";
</script>
