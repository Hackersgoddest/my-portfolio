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
        <div class="flex items-center gap-2 font-mono text-xs text-fg-faint">
          <Clock :size="14" class="shrink-0 text-primary-green" />
          Accra, GH &mdash; {{ localTime || "--:--" }}
        </div>
      </div>

      <!-- Bio -->
      <p class="mt-6 max-w-xl text-sm leading-relaxed text-fg-subtle sm:text-base">
        Full-stack developer building web, mobile, and ML-driven products.
        Based in Accra, Ghana.
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
          <p>Built with Astro &amp; Vue</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type Component } from 'vue'
import { Clock } from '@lucide/vue'
import LogoGithub from '~icons/ri/github-fill'
import LogoLinkedin from '~icons/ri/linkedin-box-fill'
import LogoInstagram from '~icons/ri/instagram-fill'
import LogoX from '~icons/ri/twitter-x-fill'
import sections from '../data/navigation'
import { scrollToSection } from '../lib/scroll'

interface SocialLink {
  name: string
  url: string
  icon: Component
}

const currentYear = computed(() => new Date().getFullYear())

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Africa/Accra',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

// Empty until mounted: the page is rendered at build time, so any time
// computed then would be stale (and mismatch on hydration).
const localTime = ref('')
let timeInterval: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  localTime.value = timeFormatter.format(new Date())
  timeInterval = setInterval(() => {
    localTime.value = timeFormatter.format(new Date())
  }, 30_000)
})

onUnmounted(() => {
  clearInterval(timeInterval)
})

const navigate = (key: string) => scrollToSection(key)

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
    icon: LogoX
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/hackersgoddest/',
    icon: LogoInstagram
  }
]
</script>
