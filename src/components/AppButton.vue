<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-mono text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none sm:px-8 sm:py-3.5 sm:text-base',
      variant === 'primary'
        ? 'bg-primary-green text-black shadow-[0_4px_14px_-2px_rgba(16,185,129,0.35)] hover:bg-primary-green-400 hover:shadow-[0_10px_30px_-4px_rgba(16,185,129,0.5)]'
        : 'border border-border/25 text-fg hover:border-primary-green/50 hover:text-primary-green',
      block ? 'w-full' : '',
      disabled ? 'pointer-events-none opacity-50' : '',
    ]"
  >
    <slot name="icon" />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    tag?: "button" | "a";
    href?: string;
    type?: "button" | "submit";
    variant?: "primary" | "secondary";
    disabled?: boolean;
    block?: boolean;
  }>(),
  {
    tag: "button",
    href: undefined,
    type: "button",
    variant: "primary",
    disabled: false,
    block: false,
  }
);

// In-page links (#portfolio) travel; only links off the site open a new tab.
const external = computed(() => !!props.href && /^https?:/.test(props.href));
</script>
