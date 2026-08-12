<template>
  <footer class="textured-surface border-t border-border/20 dark:border-border/10 bg-surface pt-16 pb-12 sm:pt-20 sm:pb-16">
    <div class="container-custom">
      <!-- Wordmark + status -->
      <div class="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          @click="navigate('home')"
          class="font-mono text-lg font-medium text-fg sm:text-xl"
        >
          <span class="text-primary-green">&lt;</span>hackersgoddest<span class="text-primary-green">/&gt;</span>
        </button>
        <div class="flex items-center gap-2 font-mono text-xs text-fg-subtle">
          <span class="h-2 w-2 rounded-full bg-primary-green animate-pulse"></span>
          Available for new projects
        </div>
      </div>

      <!-- Bio -->
      <p class="mt-6 max-w-xl text-sm leading-relaxed text-fg-subtle sm:text-base">
        Full-stack developer building web, mobile, and ML-driven products.
        Based in Accra, Ghana &mdash; available worldwide.
      </p>

      <!-- Nav echo -->
      <nav class="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
        <button
          v-for="section in sections"
          :key="section.key"
          type="button"
          @click="navigate(section.key)"
          class="font-mono text-sm text-fg-faint transition-colors duration-200 hover:text-primary-green"
        >
          <span class="text-primary-green/60">{{ section.index }}</span> {{ section.label }}
        </button>
      </nav>

      <!-- Contact, social, copyright -->
      <div class="mt-12 border-t border-border/20 dark:border-border/10 pt-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="mailto:frankoppongkonadu930@gmail.com"
              class="font-mono text-sm text-fg-muted transition-colors duration-200 hover:text-primary-green"
            >
              frankoppongkonadu930@gmail.com
            </a>
            <a
              href="tel:+233256287192"
              class="font-mono text-sm text-fg-muted transition-colors duration-200 hover:text-primary-green"
            >
              +233 256 287 192
            </a>
          </div>

          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.name"
              :title="social.name"
              class="flex h-9 w-9 items-center justify-center border border-border/20 dark:border-border/10 text-fg-subtle transition-colors duration-200 hover:border-primary-green/40 hover:text-primary-green"
            >
              <component :is="social.icon" class="h-4 w-4" />
            </a>
          </div>
        </div>

        <div class="mt-6 flex flex-col items-center justify-between gap-2 font-mono text-xs text-fg-faint sm:flex-row">
          <p>&copy; {{ currentYear }} Frank Oppong Konadu. All rights reserved.</p>
          <p>Built with Vue.js</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  LogoGithub,
  LogoLinkedin,
  LogoInstagram,
  LogoXing,
} from '@vicons/ionicons5'
import sections from '../data/navigation'

interface SocialLink {
  name: string
  url: string
  icon: Component
}

const emit = defineEmits<{ scrollToSection: [key: string] }>()

const currentYear = computed(() => new Date().getFullYear())

const navigate = (key: string) => emit('scrollToSection', key)

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Hackersgoddest',
    icon: LogoGithub
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/frank-oppong-9286b523b/',
    icon: LogoLinkedin
  },
  {
    name: 'X',
    url: 'https://x.com/_hackersgoddest',
    icon: LogoXing
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/hackersgoddest/',
    icon: LogoInstagram
  }
]
</script>
