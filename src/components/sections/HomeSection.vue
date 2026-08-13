<template>
  <section class="relative flex min-h-screen flex-col overflow-hidden pt-24 pb-16 sm:pt-32">
    <div class="container-custom relative z-10">
      <div class="max-w-3xl">
        <!-- Terminal kicker -->
        <p class="hero-kicker mb-6 font-mono text-xs xs:text-sm text-fg-faint">
          <span class="text-primary-green">frank@hackersgoddest</span>:~$
          <span class="text-fg">whoami</span>
          <span class="text-primary-green">_</span>
        </p>

        <!-- Name -->
        <div class="relative">
          <h1
            class="hero-name relative mb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-fg"
            aria-label="Frank Oppong Konadu"
          >
            <span
              class="name-grain"
              aria-hidden="true"
              :style="{ animationDelay: `${baseDelay}ms`, animationDuration: `${grainDuration}ms` }"
              >{{ FULL_NAME }}</span
            >
            <span aria-hidden="true">
              <span
                v-for="(char, i) in nameChars"
                :key="i"
                class="name-letter"
                :style="{
                  animationDelay: `${baseDelay + i * letterStagger}ms`,
                  animationDuration: `${letterDuration}ms`,
                }"
                >{{ char }}</span
              >
            </span>
          </h1>

          <span
            v-if="stepVisible"
            class="step-readout pointer-events-none absolute left-0 top-full mt-1 block font-mono text-[10px] text-fg-faint sm:text-xs"
            :class="{ 'step-readout--settled': stepSettled }"
            aria-hidden="true"
            >t={{ stepValue }}</span
          >
        </div>

        <!-- Tagline -->
        <p class="hero-tagline mb-6 font-mono text-sm sm:text-base tracking-wide text-primary-green">
          full-stack &amp; mobile engineer
          <span class="text-fg-faint">/</span> Accra, Ghana
          <span class="text-fg-faint">/</span> {{ yearsExperience }}+ yrs
        </p>

        <!-- Description -->
        <p class="hero-description mb-10 max-w-xl text-base sm:text-lg leading-relaxed text-fg-subtle">
          I build web and mobile products end to end with React, Vue, Node
          and Go — and I'm fully immersed in applied Machine Learning these
          days. Known online, and now on record, as
          <span class="text-fg">hackersgoddest</span>.
        </p>

        <!-- CTA Buttons -->
        <div class="hero-buttons flex flex-wrap gap-4">
          <AppButton variant="primary" @click.passive="$emit('scrollToSection', 'portfolio')">
            View My Work
          </AppButton>

          <AppButton
            tag="a"
            variant="secondary"
            href="https://drive.google.com/file/d/111tHR99S6vjlGwYtHTkxhDj1D3d84R_w/view?usp=sharing"
          >
            <template #icon>
              <Download :size="16" />
            </template>
            Download CV
          </AppButton>
        </div>
      </div>
    </div>

    <!-- Scroll cue -->
    <div class="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 sm:bottom-12">
      <div class="scroll-cue flex flex-col items-center gap-2 font-mono text-xs text-fg-faint">
        scroll
        <div class="relative h-8 w-px overflow-hidden bg-fg-faint/20">
          <div class="scroll-cue-beam absolute inset-x-0 h-8 w-px bg-linear-to-b from-transparent via-primary-green to-transparent"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Download } from "@lucide/vue";
import AppButton from "../AppButton.vue";

defineEmits<{ scrollToSection: [key: string] }>();

const FULL_NAME = "Frank Oppong Konadu";
const nameChars = FULL_NAME.split("");

const baseDelay = 500;
const letterStagger = 42;
const letterDuration = 760;
const grainDuration = (nameChars.length - 1) * letterStagger + letterDuration;

const yearsExperience = new Date().getFullYear() - 2022;

// Reverse-diffusion step counter (t=20 -> t=0), ticking down in sync with
// the name resolving out of grain/blur - echoes the ML line in the hero
// description instead of just decorating the text.
const stepValue = ref(20);
const stepVisible = ref(false);
const stepSettled = ref(false);
let stepTimer: ReturnType<typeof setInterval> | undefined;
let stepStartTimer: ReturnType<typeof setTimeout> | undefined;
let stepSettleTimer: ReturnType<typeof setTimeout> | undefined;

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  stepStartTimer = setTimeout(() => {
    stepVisible.value = true;
    const totalTicks = 10;
    const tickInterval = Math.round(grainDuration / totalTicks);
    let ticks = 0;

    stepTimer = setInterval(() => {
      ticks++;
      stepValue.value = Math.max(0, 20 - ticks * 2);

      if (ticks >= totalTicks) {
        clearInterval(stepTimer);
        stepSettleTimer = setTimeout(() => (stepSettled.value = true), 300);
      }
    }, tickInterval);
  }, baseDelay);
});

onUnmounted(() => {
  clearTimeout(stepStartTimer);
  clearTimeout(stepSettleTimer);
  clearInterval(stepTimer);
});
</script>

<style scoped>
.name-letter {
  opacity: 0.15;
  filter: blur(9px);
  color: var(--color-fg-faint);
  text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  animation-name: name-letter-denoise;
  animation-timing-function: steps(5, jump-end);
  animation-fill-mode: both;
}

@keyframes name-letter-denoise {
  from {
    opacity: 0.15;
    filter: blur(9px);
    color: var(--color-fg-faint);
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }
  to {
    opacity: 1;
    filter: blur(0);
    color: var(--color-fg);
    text-shadow: none;
  }
}

/* Noise texture (SVG feTurbulence) clipped to the letterforms, so the
   "grain" only shows through the glyph shapes rather than as a box. */
.name-grain {
  position: absolute;
  inset: 0;
  color: transparent;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 90px 90px;
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0.6;
  animation-name: name-grain-fade;
  animation-timing-function: steps(5, jump-end);
  animation-fill-mode: both;
  user-select: none;
}

@keyframes name-grain-fade {
  from {
    opacity: 0.6;
  }
  to {
    opacity: 0;
  }
}

.step-readout {
  opacity: 1;
  transition: opacity 400ms ease;
}

.step-readout--settled {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .name-letter {
    animation: none;
    opacity: 1;
    filter: none;
    color: var(--color-fg);
    text-shadow: none;
  }

  .name-grain {
    display: none;
  }
}

.scroll-cue {
  animation: scroll-cue-float 2.4s ease-in-out infinite;
}

.scroll-cue-beam {
  animation: scroll-cue-beam 1.8s ease-in-out infinite;
}

@keyframes scroll-cue-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}

@keyframes scroll-cue-beam {
  0% {
    transform: translateY(-100%);
  }
  60%,
  100% {
    transform: translateY(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-cue,
  .scroll-cue-beam {
    animation: none;
  }
}
</style>
