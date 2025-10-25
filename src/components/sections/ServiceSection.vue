<template>
  <section class="py-section bg-background-secondary">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-h2 font-bold text-white mb-4">
          Services
        </h2>
        <p class="text-body-lg text-gray-300 max-w-2xl mx-auto">
          Comprehensive solutions from web applications to mobile apps and desktop software
        </p>
      </div>
      
      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(service, index) in serviceOptions" 
          :key="service.title"
          class="group service-card animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="glass-card h-full p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10">
            <!-- Service Icon -->
            <div class="flex items-center mb-6">
              <div class="p-3 rounded-xl bg-primary-green/10 mr-4">
                <n-icon 
                  size="32" 
                  :component="service.icon" 
                  class="text-primary-green"
                />
              </div>
              <h3 class="text-h4 font-semibold text-white">
                {{ service.title }}
              </h3>
            </div>

            <!-- Service Description -->
            <p class="text-body text-gray-300 mb-8 leading-relaxed">
              {{ service.description }}
            </p>

            <!-- Technology Stack -->
            <div class="space-y-4">
              <h4 class="text-caption text-gray-400 font-medium uppercase tracking-wider">
                Technologies Used
              </h4>
              <div class="flex flex-wrap gap-3">
                <n-tooltip
                  v-for="tool in service.tools.slice(0, 4)"
                  :key="tool.name"
                  placement="top"
                  :delay="300"
                >
                  <template #trigger>
                    <div class="w-10 h-10 rounded-lg bg-white/5 border border-white/10 p-2 transition-all duration-200 hover:bg-white/10 hover:scale-110 cursor-pointer">
                      <img
                        :src="tool.src"
                        :alt="tool.name"
                        class="w-full h-full object-contain"
                      />
                    </div>
                  </template>
                  <span class="text-sm">{{ tool.name }}</span>
                </n-tooltip>
                
                <n-popover
                  v-if="service.tools.length > 4"
                  placement="top"
                  trigger="hover"
                  :delay="300"
                  :style="{
                    '--n-color': 'none',
                    '--n-border': 'none',
                  }"
                >
                  <template #trigger>
                    <div class="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 text-xs font-medium hover:bg-white/10 hover:scale-110 transition-all duration-200 cursor-pointer">
                      +{{ service.tools.length - 4 }}
                    </div>
                  </template>
                  <div class="space-y-2 max-w-56 glass-card border border-white/10 rounded-lg p-3">
                    <div class="text-sm font-medium text-white mb-3">Additional Technologies:</div>
                    <div class="space-y-2">
                      <div
                        v-for="tool in service.tools.slice(4)"
                        :key="tool.name"
                        class="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                      >
                        <img
                          :src="tool.src"
                          :alt="tool.name"
                          class="w-6 h-6 object-contain flex-shrink-0"
                        />
                        <span class="text-sm text-gray-300">{{ tool.name }}</span>
                      </div>
                    </div>
                  </div>
                </n-popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  GlobeOutline as InternetIcon,
  PhonePortraitOutline as PhoneIcon,
  DesktopOutline as DesktopIcon,
} from "@vicons/ionicons5";
import { NIcon, NTooltip, NPopover } from "naive-ui";
import { shallowRef } from "vue";

const serviceOptions = shallowRef([
  {
    title: "Web App Development",
    description:
      "Full-stack web application development using modern frameworks like Vue.js, React, and Node.js with robust backend architectures and responsive user interfaces.",
    icon: InternetIcon,
    tools: [
      {
        name: "React",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748681711/reactjs-svgrepo-com_ay2juw.svg",
      },
      {
        name: "Vue",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684957/vue-svgrepo-com_u7evpd.svg",
      },
      {
        name: "Node",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748685426/nodejs-1-logo-svgrepo-com_q4uvtf.svg",
      },
      {
        name: "Next",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684943/next-js-svgrepo-com_ax98mg.svg",
      },
      {
        name: "Nuxt",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684916/nuxt-svgrepo-com_yc2var.svg",
      },
      {
        name: "Nest",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684787/nestjs-svgrepo-com_osupei.svg",
      },
      {
        name: "Express",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684756/express-svgrepo-com_d26izs.svg",
      },
      {
        name: "PostgreSQL",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684933/postgresql-logo-svgrepo-com_zg0lca.svg",
      },
      {
        name: "MySQL",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684975/mysql-svgrepo-com_z3pmtr.svg",
      },
      {
        name: "MongoDB",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684803/mongodb-svgrepo-com_b3xsei.svg",
      },
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform mobile application development for iOS and Android using React Native and Expo framework, delivering native performance with faster development and seamless deployment.",
    icon: PhoneIcon,
    tools: [
      {
        name: "React Native",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748681711/reactjs-svgrepo-com_ay2juw.svg",
      },
      {
        name: "Expo",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748681424/expo-svgrepo-com_jq6ehe.svg",
      },
      {
        name: "Android Studio",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748686721/androidstudio-svgrepo-com_elzloz.svg",
      },
    ],
  },
  {
    title: "Desktop App Development",
    description:
      "Custom desktop application development for Windows platforms using C# and .NET framework, delivering high-performance solutions with intuitive user experiences.",
    icon: DesktopIcon,
    tools: [
      {
        name: "C#",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684736/csharp-svgrepo-com_itij5a.svg",
      },
      {
        name: ".NET",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684746/dot-net-svgrepo-com_oejp6g.svg",
      },
    ],
  },
]);
</script>
