<template>
  <div class="section-header mb-16" :class="center ? 'text-center' : ''">
    <div class="mb-4 flex items-center gap-3" :class="center ? 'justify-center' : ''">
      <span class="font-mono text-sm text-primary-green">{{ index }}.</span>
      <span class="font-mono text-xs uppercase tracking-[0.2em] text-fg-faint">{{ eyebrow }}</span>
    </div>
    <h2 class="text-h2 font-bold text-fg mb-4">{{ title }}</h2>
    <p
      v-if="description"
      class="text-body-lg text-fg-muted max-w-2xl"
      :class="center ? 'mx-auto' : ''"
    >
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    index: string;
    eyebrow: string;
    title: string;
    description?: string;
    center?: boolean;
  }>(),
  {
    description: "",
    center: true,
  }
);
</script>
