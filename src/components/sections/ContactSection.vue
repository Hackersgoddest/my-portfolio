<template>
  <section class="py-section">
    <div class="container-custom">
      <SectionHeader
        index="05"
        eyebrow="Get In Touch"
        title="Let's Work Together"
        description="Ready to bring your ideas to life? Let's connect and discuss how we can create something amazing together."
      />

      <div class="mx-auto grid max-w-5xl grid-cols-1 gap-16 lg:grid-cols-2">
        <!-- Contact Form -->
        <div>
          <ContactForm />
        </div>

        <!-- Contact Information -->
        <div>
          <h4 class="mb-5 font-mono text-sm uppercase tracking-widest text-fg-faint">Reach me directly</h4>
          <div class="mb-10 space-y-4">
            <a
              href="mailto:frankoppongkonadu930@gmail.com"
              class="contact-item flex items-center gap-3 font-mono text-sm text-fg-muted transition-colors duration-200 hover:text-primary-green sm:text-base"
            >
              <Mail :size="16" class="shrink-0 text-primary-green" />
              frankoppongkonadu930@gmail.com
            </a>

            <a
              href="tel:+233256287192"
              class="contact-item flex items-center gap-3 font-mono text-sm text-fg-muted transition-colors duration-200 hover:text-primary-green sm:text-base"
            >
              <Phone :size="16" class="shrink-0 text-primary-green" />
              +233 256 287 192
            </a>
          </div>

          <h4 class="mb-5 font-mono text-sm uppercase tracking-widest text-fg-faint">Connect</h4>
          <div class="mb-10 flex flex-wrap gap-3">
            <a
              v-for="social in socialOptions"
              :key="social.name"
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              :title="social.label"
              class="contact-item flex h-10 w-10 items-center justify-center rounded-lg border border-border/20 dark:border-border/10 text-fg-subtle transition-colors duration-200 hover:border-primary-green/40 hover:text-primary-green"
            >
              <component :is="social.icon" class="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Component } from "vue";
import ContactForm from "../ContactForm.vue";
import SectionHeader from "../SectionHeader.vue";
import { Mail, Phone } from "@lucide/vue";
import LogoLinkedin from "~icons/ri/linkedin-box-fill";
import LogoGithub from "~icons/ri/github-fill";
import LogoInstagram from "~icons/ri/instagram-fill";
import LogoStackoverflow from "~icons/ri/stack-overflow-fill";
import LogoX from "~icons/ri/twitter-x-fill";

interface SocialOption {
  name: string;
  label: string;
  link: string;
  icon: Component;
}

const socialOptions: SocialOption[] = [
  {
    name: "LinkedIn",
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/frank-oppong-9286b523b/",
    icon: LogoLinkedin
  },
  {
    name: "GitHub",
    label: "GitHub",
    link: "https://github.com/Hackersgoddest",
    icon: LogoGithub
  },
  {
    name: "X",
    label: "X",
    link: "https://x.com/_hackersgoddest",
    icon: LogoX
  },
  {
    name: "Instagram",
    label: "Instagram",
    link: "https://www.instagram.com/hackersgoddest/",
    icon: LogoInstagram
  },
  {
    name: "Stack Overflow",
    label: "Stack Overflow",
    link: "https://stackoverflow.com/users/17446079/frank-oppong-konadu",
    icon: LogoStackoverflow
  }
];
</script>
