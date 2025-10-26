<template>
  <section class="py-section bg-background-secondary">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="section-header text-center mb-16">
        <h2 class="text-h2 font-bold text-white mb-4">Featured Projects</h2>
        <p class="text-body-lg text-gray-300 max-w-2xl mx-auto">
          A showcase of innovative solutions and creative implementations across
          various platforms
        </p>
      </div>

      <!-- Projects Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-7 sm:gap-8 md:gap-9 lg:gap-10"
      >
        <div
          v-for="(project, index) in portfolioOptions"
          :key="project.title"
          class="portfolio-card group relative overflow-hidden rounded-2xl xs:rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/5 backdrop-blur-xl border border-white/20 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-400/30"
        >
          <!-- Animated Top Border -->
          <div
            class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          <!-- Project Image -->
          <div
            class="relative h-40 xs:h-44 sm:h-48 overflow-hidden rounded-t-2xl xs:rounded-t-3xl"
          >
            <img
              :src="project.images[0]"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            <!-- Gradient Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <!-- Quick Actions -->
            <div
              class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            >
              <button
                @click="openProjectModal(project)"
                class="px-3 xs:px-4 py-1.5 xs:py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg xs:rounded-xl text-white text-xs xs:text-sm font-medium flex items-center gap-1.5 xs:gap-2 hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-200 hover:scale-105"
              >
                <n-icon
                  :component="EyeOutline"
                  size="14"
                  class="xs:w-4 xs:h-4"
                />
                Quick View
              </button>
              <a
                v-if="project.links[0]"
                :href="project.links[0].link"
                target="_blank"
                class="px-3 xs:px-4 py-1.5 xs:py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg xs:rounded-xl text-white text-xs xs:text-sm font-medium flex items-center gap-1.5 xs:gap-2 hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-200 hover:scale-105"
              >
                <n-icon
                  :component="OpenOutline"
                  size="14"
                  class="xs:w-4 xs:h-4"
                />
                Live Demo
              </a>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-4 xs:p-5 sm:p-6">
            <!-- Project Title -->
            <h3
              class="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-2 xs:mb-3 tracking-tight leading-tight"
            >
              {{ project.title }}
            </h3>

            <!-- Project Description -->
            <p
              class="text-slate-300 text-xs xs:text-sm leading-relaxed mb-3 xs:mb-4 line-clamp-2"
            >
              {{ getProjectSummary(project.description) }}
            </p>

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-1.5 xs:gap-2 mb-4 xs:mb-5 sm:mb-6">
              <span
                v-for="(tool, toolIndex) in project.tools.slice(0, 4)"
                :key="tool"
                :style="{ animationDelay: `${toolIndex * 50}ms` }"
                class="px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-md xs:rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-500/20 transition-all duration-200 cursor-default animate-fade-in-up"
              >
                {{ tool }}
              </span>
              <span
                v-if="project.tools.length > 4"
                class="px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 bg-slate-700/50 text-slate-400 text-xs font-medium rounded-md xs:rounded-lg border border-slate-600/50 hover:bg-slate-600/50 transition-all duration-200 cursor-help"
                :title="`${project.tools.slice(4).join(', ')}`"
              >
                +{{ project.tools.length - 4 }} more
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2 xs:gap-2.5 sm:gap-3">
              <button
                @click="openProjectModal(project)"
                class="flex-1 px-3 xs:px-4 py-2 xs:py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs xs:text-sm font-medium rounded-lg xs:rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 xs:gap-2 hover:-translate-y-0.5"
              >
                <n-icon
                  :component="EyeOutline"
                  size="14"
                  class="xs:w-4 xs:h-4"
                />
                <span class="hidden xs:inline">View Details</span>
                <span class="xs:hidden">Details</span>
              </button>

              <a
                v-if="project.links[0]"
                :href="project.links[0].link"
                target="_blank"
                class="flex-1 px-3 xs:px-4 py-2 xs:py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs xs:text-sm font-medium rounded-lg xs:rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 xs:gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25"
              >
                <n-icon
                  :component="OpenOutline"
                  size="14"
                  class="xs:w-4 xs:h-4"
                />
                <span class="hidden sm:inline">{{
                  project.links[0].name
                }}</span>
                <span class="sm:hidden">{{
                  project.links[0].name.includes("VIEW") ? "Code" : "Live"
                }}</span>
              </a>
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
          <div
            class="flex items-center justify-between p-6 border-b border-white/10"
          >
            <h3 class="text-h3 font-bold text-white">
              {{ selectedProject.title }}
            </h3>
            <button
              @click="closeProjectModal"
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
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
                  <div
                    v-if="selectedProject.images.length > 1"
                    class="absolute inset-0 flex items-center justify-between p-4"
                  >
                    <button
                      @click="previousImage"
                      class="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                    </button>
                    <button
                      @click="nextImage"
                      class="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Image Dots -->
                <div
                  v-if="selectedProject.images.length > 1"
                  class="flex justify-center gap-2"
                >
                  <button
                    v-for="(image, index) in selectedProject.images"
                    :key="index"
                    @click="currentImageIndex = index"
                    :class="[
                      'w-2 h-2 rounded-full transition-colors duration-200',
                      currentImageIndex === index
                        ? 'bg-primary-green'
                        : 'bg-white/30',
                    ]"
                  ></button>
                </div>
              </div>

              <!-- Project Details -->
              <div>
                <!-- Description -->
                <div
                  class="text-body text-gray-300 mb-6 leading-relaxed"
                  v-html="selectedProject.description"
                ></div>

                <!-- Technologies -->
                <div class="mb-6">
                  <h4
                    class="text-caption text-gray-400 font-medium uppercase tracking-wider mb-3"
                  >
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
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
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
import { NIcon } from "naive-ui";
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
    tools: [
      "VueJs",
      "Bootstrap",
      "FeatherJs",
      "Typescript",
      "NodeJS",
      "MongoDB",
    ],
    links: [{ name: "VISIT SITE", link: "https://www.ebanregister.com/" }],
  },
  {
    title: "GreenGold Ghana",
    description: `<p>GreenGold Ghana is an eco-innovation company that transforms discarded plantain waste into high-quality, eco-friendly fibers. The platform showcases their sustainable manufacturing process and allows users to:</br><ul><li>Explore eco-friendly products (wigs, hair extensions, sanitary pads, bags)</li><li>Learn about environmental impact and sustainability</li><li>Connect with the team and investors</li><li>Partner with the company for sustainable solutions</li><li>View real-time impact statistics (CO₂ saved, jobs created)</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761389446/Screenshot_2025-10-25_at_10.48.37_AM_jpiop6.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761389447/Screenshot_2025-10-25_at_10.49.00_AM_hdv5oi.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761389447/Screenshot_2025-10-25_at_10.49.18_AM_rsbvwx.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761389446/Screenshot_2025-10-25_at_10.49.30_AM_rs1psj.png",
    ],
    tools: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Framer Motion",
      "React Router",
      "Lucide Icons",
    ],
    links: [
      { name: "VISIT SITE", link: "https://greengoldghanalimited.netlify.app" },
      {
        name: "VIEW CODE",
        link: "https://github.com/Hackersgoddest/greengold",
      },
    ],
  },
  {
    title: "Promptopia",
    description: `<p>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts. The application allows one to:</br><ul><li>Discover AI prompts</li><li>Create AI prompts</li><li>Edit AI prompts</li><li>Delete AI prompts</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491174/login_d2wlty.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491191/homepage_abswnc.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491206/profile_glj8lb.png",
    ],
    tools: [
      "NextJs",
      "Tailwind",
      "DaisyUI",
      "Typescript",
      "MongoDB",
      "NextAuth",
    ],
    links: [
      {
        name: "VIEW CODE",
        link: "https://github.com/Hackersgoddest/promptopia",
      },
    ],
  },
  {
    title: "E-VotePro",
    description: `<p>A comprehensive voting system built using C# Windows Forms and MySQL, designed to facilitate secure, efficient, and transparent elections. Perfect for educational institutions, organizations, and small-scale elections. The system features:</br><ul><li>Secure user authentication for students and admins</li><li>Real-time voting results and analytics</li><li>Comprehensive admin dashboard for election management</li><li>Candidate management system</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968512/Screenshot_2025-06-03_at_4.30.45_PM_iygotw.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968505/Screenshot_2025-06-03_at_4.30.30_PM_bqnl7e.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968497/Screenshot_2025-06-03_at_4.30.18_PM_xma9og.png",
    ],
    tools: ["C#", "Windows Forms", ".NET", "MySQL", "Entity Framework"],
    links: [
      {
        name: "VIEW CODE",
        link: "https://github.com/Hackersgoddest/E-VotePro",
      },
    ],
  },
]);

const openProjectModal = (project) => {
  selectedProject.value = project;
  currentImageIndex.value = 0;
  document.body.style.overflow = "hidden";
};

const closeProjectModal = () => {
  selectedProject.value = null;
  currentImageIndex.value = 0;
  document.body.style.overflow = "auto";
};

const nextImage = () => {
  if (
    selectedProject.value &&
    currentImageIndex.value < selectedProject.value.images.length - 1
  ) {
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
  const div = document.createElement("div");
  div.innerHTML = description;
  const textContent = div.textContent || div.innerText || "";

  const firstSentence = textContent.split(".")[0];
  return firstSentence.length > 120
    ? textContent.substring(0, 120) + "..."
    : firstSentence + ".";
};
</script>
