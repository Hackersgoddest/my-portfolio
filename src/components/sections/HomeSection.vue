<template>
  <section class="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20 pb-16 short-screen:pt-14">
    <div class="container-custom relative z-10">
      <div class="max-w-3xl">
        <!-- Terminal kicker -->
        <p class="hero-kicker mb-6 font-mono text-xs xs:text-sm text-fg-faint">
          <span class="text-primary-green">frank@hackersgoddest</span>:~$
          <span class="text-fg">whoami</span>
          <span class="text-primary-green">_</span>
        </p>

        <!-- Name -->
        <h1
          class="hero-name mb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-fg"
        >
          {{ scrambledName }}
        </h1>

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
            href="https://drive.google.com/file/d/14Arynr8EpfjBji6YJuez8fW3q8HXpoFq/view?usp=sharing"
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
    <div class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
      <div class="flex flex-col items-center gap-2 font-mono text-xs text-fg-faint">
        scroll
        <div class="h-8 w-px bg-linear-to-b from-fg-faint to-transparent"></div>
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
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#";

const scrambledName = ref(FULL_NAME);
const yearsExperience = new Date().getFullYear() - 2022;

let scrambleTimer: ReturnType<typeof setTimeout> | undefined;

const runScramble = () => {
  const totalFrames = 24;
  let frame = 0;

  clearInterval(scrambleTimer);
  scrambleTimer = setInterval(() => {
    frame++;
    const revealCount = Math.floor((frame / totalFrames) * FULL_NAME.length);

    scrambledName.value = FULL_NAME.split("")
      .map((char, i) => {
        if (char === " " || i < revealCount) return char;
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      })
      .join("");

    if (frame >= totalFrames) {
      scrambledName.value = FULL_NAME;
      clearInterval(scrambleTimer);
    }
  }, 40);
};

onMounted(() => {
  scrambleTimer = setTimeout(runScramble, 550);
});

onUnmounted(() => clearInterval(scrambleTimer));
</script>
