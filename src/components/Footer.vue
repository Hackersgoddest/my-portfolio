<template>
  <footer class="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-white/10 pt-8 mt-8 sm:pt-0 sm:mt-20 md:mt-24">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0); background-size: 20px 20px;"></div>
    </div>
    
    <!-- Main Footer Content -->
    <div class="relative z-10">
      <!-- Top Section -->
      <div class="container-custom pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 place-items-start">
          
          <!-- Brand & Bio Section -->
          <div class="md:col-span-1 justify-self-start md:justify-self-end">
            <div class="space-y-4 sm:space-y-6">
              <!-- Logo/Name -->
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-green-400 to-primary-green-600 rounded-xl flex items-center justify-center">
                  <n-icon :component="Code" size="20" class="text-white sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 class="text-lg sm:text-xl font-bold text-white">Frank Oppong Konadu</h3>
                  <p class="text-xs sm:text-sm text-primary-green-400 font-medium">Software Developer</p>
                </div>
              </div>
              
              <!-- Bio -->
              <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
                Passionate full-stack developer crafting digital experiences with modern technologies. 
                Let's build something amazing together.
              </p>
              
              <!-- Location -->
              <div class="flex items-center space-x-2 text-gray-400">
                <n-icon :component="LocationOutline" size="14" class="text-primary-green-400 sm:w-4 sm:h-4" />
                <span class="text-xs sm:text-sm">Accra, Ghana • Available Worldwide</span>
              </div>
            </div>
          </div>
          
          <!-- Contact & Social -->
          <div class="md:col-span-1 justify-self-start">
            <h4 class="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Let's Connect</h4>
            <div class="space-y-4 sm:space-y-6">
              
              <!-- Contact Info -->
              <div class="space-y-3 sm:space-y-4">
                <a 
                  href="mailto:frankoppongkonadu@gmail.com"
                  class="flex items-center space-x-3 sm:space-x-4 text-gray-300 hover:text-primary-green-400 transition-colors duration-300 group"
                >
                  <div class="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-primary-green-400/10 transition-colors duration-300">
                    <n-icon :component="MailOutline" size="16" class="sm:w-4 sm:h-4" />
                  </div>
                  <span class="text-sm sm:text-base break-all">frankoppongkonadu@gmail.com</span>
                </a>
                
                <a 
                  href="tel:+233550699777"
                  class="flex items-center space-x-3 sm:space-x-4 text-gray-300 hover:text-primary-green-400 transition-colors duration-300 group"
                >
                  <div class="w-9 h-9 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-primary-green-400/10 transition-colors duration-300">
                    <n-icon :component="CallOutline" size="16" class="sm:w-4 sm:h-4" />
                  </div>
                  <span class="text-sm sm:text-base">+233 55 069 9777</span>
                </a>
              </div>
              
              <!-- Social Links -->
              <div>
                <p class="text-sm sm:text-base text-gray-400 mb-4 sm:mb-5">Follow me on social media</p>
                <div class="flex space-x-4 sm:space-x-5">
                  <a
                    v-for="social in socialLinks"
                    :key="social.name"
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group relative"
                  >
                    <div class="w-11 h-11 sm:w-12 sm:h-12 bg-white/5 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-primary-green-400/10 group-hover:scale-110 group-hover:-translate-y-1">
                      <n-icon :component="social.icon" size="20" class="text-gray-400 group-hover:text-primary-green-400 transition-colors duration-300 sm:w-5 sm:h-5" />
                    </div>
                    
                    <!-- Tooltip -->
                    <div class="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                      {{ social.name }}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bottom Section -->
      <div class="border-t border-white/10 pt-4 mt-4 sm:mt-10 sm:pt-0 md:mt-12">
        <div class="container-custom py-6 sm:py-8 md:py-10">
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 gap-3 sm:gap-4">
            <!-- Copyright -->
            <div class="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              <p>© {{ currentYear }} Frank Oppong Konadu. All rights reserved.</p>
            </div>
            
            <!-- Made with -->
            <div class="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-400">
              <span>Made with</span>
              <div class="w-3 h-3 sm:w-4 sm:h-4 text-red-400 animate-pulse">❤️</div>
              <span>using</span>
              <div class="flex items-center space-x-1">
                <img src="https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684957/vue-svgrepo-com_u7evpd.svg" alt="Vue.js" class="w-3 h-3 sm:w-4 sm:h-4" />
                <span class="text-primary-green-400 font-medium">Vue.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import {
  Code,
  LocationOutline,
  MailOutline,
  CallOutline,
  LogoGithub,
  LogoLinkedin,
  LogoTwitter,
  LogoInstagram
} from '@vicons/ionicons5'

// Current year for copyright
const currentYear = computed(() => new Date().getFullYear())



// Social media links
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/frankoppongkonadu',
    icon: LogoGithub
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/frankoppongkonadu',
    icon: LogoLinkedin
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/frankoppongkonadu',
    icon: LogoTwitter
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/frankoppongkonadu',
    icon: LogoInstagram
  }
]


</script>