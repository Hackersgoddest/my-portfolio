<template>
  <section class="py-section bg-background-primary">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-h2 font-bold text-white mb-4">
          Let's Work Together
        </h2>
        <p class="text-body-lg text-gray-300 max-w-2xl mx-auto">
          Ready to bring your ideas to life? Let's connect and discuss how we can create something amazing together.
        </p>
      </div>

      <div class="max-w-6xl mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="order-2 lg:order-1">
            <ContactForm />
          </div>

          <!-- Contact Information -->
          <div class="order-1 lg:order-2">
            <div class="space-y-8">
              <!-- Direct Contact -->
              <div class="glass-card p-6 rounded-2xl">
                <h4 class="text-h4 font-semibold text-white mb-4">
                  Get in Touch
                </h4>
                <div class="space-y-4">
                  <a
                    href="mailto:frankoppongkonadu930@gmail.com"
                    class="flex items-center gap-4 text-gray-300 hover:text-primary-green transition-colors duration-200"
                  >
                    <div class="w-12 h-12 bg-primary-green/10 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <div class="font-medium">Email</div>
                      <div class="text-sm text-gray-400">frankoppongkonadu930@gmail.com</div>
                    </div>
                  </a>
                  
                  <a
                    href="tel:+233256287192"
                    class="flex items-center gap-4 text-gray-300 hover:text-primary-green transition-colors duration-200"
                  >
                    <div class="w-12 h-12 bg-primary-green/10 rounded-xl flex items-center justify-center">
                      <svg class="w-6 h-6 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <div>
                      <div class="font-medium">Phone</div>
                      <div class="text-sm text-gray-400">+233 256 287 192</div>
                    </div>
                  </a>
                </div>
              </div>

              <!-- Social Links -->
              <div class="glass-card p-6 rounded-2xl">
                <h4 class="text-h4 font-semibold text-white mb-4">
                  Connect with me
                </h4>
                <div class="grid grid-cols-2 gap-4">
                  <a
                    v-for="social in socialOptions"
                    :key="social.name"
                    :href="social.link"
                    target="_blank"
                    class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-primary-green/30 transition-all duration-200"
                  >
                    <component :is="social.icon" class="w-5 h-5 text-primary-green flex-shrink-0" />
                    <span class="text-sm font-medium truncate">{{ social.label }}</span>
                  </a>
                </div>
              </div>

              <!-- Availability -->
              <div class="glass-card p-6 rounded-2xl">
                <h4 class="text-h4 font-semibold text-white mb-4">
                  Availability
                </h4>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="text-gray-300">Available for new projects</span>
                  </div>
                  <div class="text-sm text-gray-400">
                    I typically respond within 24 hours
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ContactForm from "../ContactForm.vue";
import {
  LogoLinkedin,
  LogoGithub,
  LogoTwitter,
  LogoInstagram,
  LogoStackoverflow,
} from "@vicons/ionicons5";

const socialOptions = [
  {
    name: "LinkedIn",
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/frank-oppong-konadu-9286b523b/",
    icon: LogoLinkedin
  },
  {
    name: "GitHub",
    label: "GitHub",
    link: "https://github.com/Hackersgoddest",
    icon: LogoGithub
  },
  {
    name: "Twitter",
    label: "Twitter",
    link: "https://twitter.com/UndefineHacker",
    icon: LogoTwitter
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
