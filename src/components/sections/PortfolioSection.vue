<template>
  <section class="py-section bg-background-secondary">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-h2 font-bold text-white mb-4">
          Featured Projects
        </h2>
        <p class="text-body-lg text-gray-300 max-w-2xl mx-auto">
          A showcase of innovative solutions and creative implementations across various platforms
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in portfolioOptions"
          :key="project.title"
          class="group project-card animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-white/10 hover:border-primary-green/20">
            <!-- Project Image -->
            <div class="relative overflow-hidden">
              <img
                :src="project.images[0]"
                :alt="project.title"
                class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                @click="openProjectModal(project)"
              >
                <n-button 
                  type="primary" 
                  size="large" 
                  round
                  class="shadow-lg"
                >
                  <template #icon>
                    <n-icon :component="EyeOutline" />
                  </template>
                  Quick View
                </n-button>
              </div>
              
              <!-- Project Status Badge -->
              <div class="absolute top-4 right-4">
                <n-tag
                  :type="project.status === 'completed' ? 'success' : project.status === 'in-progress' ? 'warning' : 'info'"
                  size="small"
                  round
                  class="backdrop-blur-sm"
                >
                  {{ project.status === 'completed' ? 'Live' : project.status === 'in-progress' ? 'In Progress' : 'Concept' }}
                </n-tag>
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-6">
              <!-- Project Title -->
              <h3 class="text-h4 font-semibold text-white mb-3">
                {{ project.title }}
              </h3>

              <!-- Project Description -->
              <p class="text-body text-gray-300 mb-4 leading-relaxed">
                {{ getProjectSummary(project.description) }}
              </p>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tool in project.tools.slice(0, 4)"
                  :key="tool"
                  class="text-xs px-3 py-1 bg-primary-green/10 text-primary-green rounded-full border border-primary-green/20"
                >
                  {{ tool }}
                </span>
                <span
                  v-if="project.tools.length > 4"
                  class="text-xs px-3 py-1 bg-white/5 text-gray-400 rounded-full border border-white/10"
                >
                  +{{ project.tools.length - 4 }} more
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <n-button
                  secondary
                  size="medium"
                  @click="openProjectModal(project)"
                  class="flex-1"
                  :style="{
                    '--n-border': '1px solid rgba(255, 255, 255, 0.1)',
                    '--n-border-hover': '1px solid rgba(255, 255, 255, 0.2)',
                    '--n-border-pressed': '1px solid rgba(255, 255, 255, 0.3)',
                    '--n-color': 'rgba(255, 255, 255, 0.05)',
                    '--n-color-hover': 'rgba(255, 255, 255, 0.1)',
                    '--n-color-pressed': 'rgba(255, 255, 255, 0.15)',
                    '--n-text-color': 'rgb(209, 213, 219)',
                    '--n-text-color-hover': 'rgb(255, 255, 255)',
                    '--n-text-color-pressed': 'rgb(255, 255, 255)',
                  }"
                >
                  <template #icon>
                    <n-icon :component="EyeOutline" />
                  </template>
                  View Details
                </n-button>
                <n-button
                  v-if="project.links[0]"
                  type="primary"
                  size="medium"
                  tag="a"
                  :href="project.links[0].link"
                  target="_blank"
                  class="flex-1"
                  :style="{
                    '--n-color': 'rgb(52, 211, 153)',
                    '--n-color-hover': 'rgb(34, 197, 94)',
                    '--n-color-pressed': 'rgb(22, 163, 74)',
                  }"
                >
                  <template #icon>
                    <n-icon :component="OpenOutline" />
                  </template>
                  {{ project.links[0].name }}
                </n-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Modal -->
      <div
        v-if="selectedProject"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click="closeProjectModal"
      >
        <div
          class="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
          @click.stop
        >
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-white/10">
            <h3 class="text-h3 font-bold text-white">
              {{ selectedProject.title }}
            </h3>
            <button
              @click="closeProjectModal"
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Project Images -->
              <div>
                <div class="relative rounded-xl overflow-hidden mb-4">
                  <img
                    :src="selectedProject.images[currentImageIndex]"
                    :alt="selectedProject.title"
                    class="w-full h-64 object-cover"
                  />
                  <!-- Image Navigation -->
                  <div v-if="selectedProject.images.length > 1" class="absolute inset-0 flex items-center justify-between p-4">
                    <button
                      @click="previousImage"
                      class="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                    </button>
                    <button
                      @click="nextImage"
                      class="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <!-- Image Dots -->
                <div v-if="selectedProject.images.length > 1" class="flex justify-center gap-2">
                  <button
                    v-for="(image, index) in selectedProject.images"
                    :key="index"
                    @click="currentImageIndex = index"
                    :class="[
                      'w-2 h-2 rounded-full transition-colors duration-200',
                      currentImageIndex === index ? 'bg-primary-green' : 'bg-white/30'
                    ]"
                  ></button>
                </div>
              </div>

              <!-- Project Details -->
              <div>
                <!-- Description -->
                <div class="text-body text-gray-300 mb-6 leading-relaxed" v-html="selectedProject.description"></div>

                <!-- Technologies -->
                <div class="mb-6">
                  <h4 class="text-caption text-gray-400 font-medium uppercase tracking-wider mb-3">
                    Technologies Used
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tool in selectedProject.tools"
                      :key="tool"
                      class="text-sm px-3 py-1 bg-primary-green/10 text-primary-green rounded-full border border-primary-green/20"
                    >
                      {{ tool }}
                    </span>
                  </div>
                </div>

                <!-- Links -->
                <div class="flex flex-wrap gap-3">
                  <a
                    v-for="link in selectedProject.links"
                    :key="link.name"
                    :href="link.link"
                    target="_blank"
                    class="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    {{ link.name }}
                  </a>
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
import { ref } from "vue";
import { NButton, NTag, NIcon } from "naive-ui";
import { EyeOutline, OpenOutline } from "@vicons/ionicons5";

const selectedProject = ref(null);
const currentImageIndex = ref(0);

const portfolioOptions = ref([
  {
    title: "Eban Register",
    description: `<p>An Electronic attendance system with employee and membership management modules. 70 organizations has enrolled on the platform since it's deployment in december 2020. The system allows employees or members of organizations to take attendance with their phone by:</br><ul><li>Scanning a QR-Code</li><li>Using their GPS</li><li>Scanning an NFC tag</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/jolsoft/image/upload/v1634246757/portfolio/eban-admin/eban-admin-screen-1_zmjbnx.png",
      "https://res.cloudinary.com/jolsoft/image/upload/v1634247513/portfolio/eban-admin/eban-admin-screen-2_pcvgyu.png",
      "https://res.cloudinary.com/jolsoft/image/upload/v1634248046/portfolio/eban-admin/eban-admin-screen-3_licoyr.png",
    ],
    tools: ["VueJs", "Bootstrap", "FeatherJs", "Typescript", "NodeJS", "MongoDB"],
    links: [{ name: "VISIT SITE", link: "https://www.ebanregister.com/" }],
    status: "completed"
  },
  {
    title: "Promptopia",
    description: `<p>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts. The application allows one to:</br><ul><li>Discover AI prompts</li><li>Create AI prompts</li><li>Edit AI prompts</li><li>Delete AI prompts</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491174/login_d2wlty.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491191/homepage_abswnc.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491206/profile_glj8lb.png",
    ],
    tools: ["NextJs", "Tailwind", "DaisyUI", "Typescript", "MongoDB", "NextAuth"],
    links: [
      { name: "VIEW CODE", link: "https://github.com/Hackersgoddest/promptopia" },
    ],
    status: "completed"
  },
  {
    title: "E-VotePro",
    description: `<p>A comprehensive voting system built using C# Windows Forms and MySQL, designed to facilitate secure, efficient, and transparent elections. Perfect for educational institutions, organizations, and small-scale elections. The system features:</br><ul><li>Secure user authentication for students and admins</li><li>Real-time voting results and analytics</li><li>Comprehensive admin dashboard for election management</li><li>Candidate management system</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968512/Screenshot_2025-06-03_at_4.30.45_PM_iygotw.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968505/Screenshot_2025-06-03_at_4.30.30_PM_bqnl7e.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968497/Screenshot_2025-06-03_at_4.30.18_PM_xma9og.png"
    ],
    tools: ["C#", "Windows Forms", ".NET", "MySQL", "Entity Framework"],
    links: [
      { name: "VIEW CODE", link: "https://github.com/Hackersgoddest/E-VotePro" }
    ],
    status: "completed"
  },
]);

const openProjectModal = (project) => {
  selectedProject.value = project;
  currentImageIndex.value = 0;
  document.body.style.overflow = 'hidden';
};

const closeProjectModal = () => {
  selectedProject.value = null;
  currentImageIndex.value = 0;
  document.body.style.overflow = 'auto';
};

const nextImage = () => {
  if (selectedProject.value && currentImageIndex.value < selectedProject.value.images.length - 1) {
    currentImageIndex.value++;
  } else {
    currentImageIndex.value = 0;
  }
};

const previousImage = () => {
  if (selectedProject.value && currentImageIndex.value > 0) {
    currentImageIndex.value--;
  } else {
    currentImageIndex.value = selectedProject.value.images.length - 1;
  }
};

const getProjectSummary = (description) => {
  // Extract text content from HTML and limit to first sentence or 120 characters
  const div = document.createElement('div');
  div.innerHTML = description;
  const textContent = div.textContent || div.innerText || '';
  
  const firstSentence = textContent.split('.')[0];
  return firstSentence.length > 120 
    ? textContent.substring(0, 120) + '...'
    : firstSentence + '.';
};
</script>
