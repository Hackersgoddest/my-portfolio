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
          v-for="project in portfolioOptions"
          :key="project.title"
          class="portfolio-card group relative overflow-hidden rounded-2xl xs:rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/5 backdrop-blur-xl border border-white/20 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-400/30"
        >
          <!-- Top Border -->
          <div
            class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          <!-- Image -->
          <div
            class="relative h-40 xs:h-44 sm:h-48 overflow-hidden rounded-t-2xl xs:rounded-t-3xl"
          >
            <img
              :src="project.images[0]"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />

            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            <!-- Actions -->
            <div
              class="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            >
              <button
                @click="openProjectModal(project)"
                class="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white text-sm flex items-center gap-2 hover:bg-emerald-500 hover:border-emerald-500 transition"
              >
                <n-icon :component="EyeOutline" size="16" />
                Quick View
              </button>

              <a
                v-if="project.links[0]"
                :href="project.links[0].link"
                target="_blank"
                class="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white text-sm flex items-center gap-2 hover:bg-emerald-500 hover:border-emerald-500 transition"
              >
                <n-icon :component="OpenOutline" size="16" />
                Live
              </a>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5">
            <h3 class="text-xl font-bold text-white mb-2">
              {{ project.title }}
            </h3>

            <p class="text-slate-300 text-sm mb-4 line-clamp-2">
              {{ getProjectSummary(project.description) }}
            </p>

            <!-- Tech -->
            <div class="flex flex-wrap gap-2 mb-5">
              <span
                v-for="tool in project.tools.slice(0, 4)"
                :key="tool"
                class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-lg border border-emerald-500/20"
              >
                {{ tool }}
              </span>

              <span
                v-if="project.tools.length > 4"
                class="px-2.5 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-lg"
              >
                +{{ project.tools.length - 4 }}
              </span>
            </div>

            <!-- Buttons -->
            <div class="flex gap-3">
              <button
                @click="openProjectModal(project)"
                class="flex-1 py-2 bg-white/5 border border-white/10 text-sm rounded-xl text-white hover:bg-white/10 transition"
              >
                Details
              </button>

              <a
                v-if="project.links[0]"
                :href="project.links[0].link"
                target="_blank"
                class="flex-1 py-2 bg-emerald-500 text-white text-sm rounded-xl text-center hover:bg-emerald-600 transition"
              >
                {{ project.links[0].name.includes("VIEW") ? "Code" : "Live" }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL -->
      <div
        v-if="selectedProject"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="closeProjectModal"
      >
        <div
          class="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <!-- Header -->
          <div
            class="flex justify-between items-center p-6 border-b border-white/10"
          >
            <h3 class="text-xl font-bold text-white">
              {{ selectedProject.title }}
            </h3>
            <button
              @click="closeProjectModal"
              class="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 grid lg:grid-cols-2 gap-8">
            <!-- Images -->
            <div>
              <img
                :src="selectedProject.images[currentImageIndex]"
                :alt="selectedProject.title"
                class="w-full h-64 object-cover rounded-xl mb-4"
              />

              <div class="flex justify-center gap-2">
                <button
                  v-for="(img, i) in selectedProject.images"
                  :key="i"
                  @click="currentImageIndex = i"
                  :class="[
                    'w-2 h-2 rounded-full',
                    i === currentImageIndex ? 'bg-emerald-400' : 'bg-white/30',
                  ]"
                />
              </div>
            </div>

            <!-- Details -->
            <div>
              <div
                class="text-gray-300 mb-6"
                v-html="selectedProject.description"
              />

              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tool in selectedProject.tools"
                  :key="tool"
                  class="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm"
                >
                  {{ tool }}
                </span>
              </div>

              <div class="flex gap-3">
                <a
                  v-for="link in selectedProject.links"
                  :key="link.name"
                  :href="link.link"
                  target="_blank"
                  class="px-4 py-2 bg-emerald-500 rounded-lg text-white text-sm"
                >
                  {{ link.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { NIcon } from "naive-ui";
import { EyeOutline, OpenOutline } from "@vicons/ionicons5";

const selectedProject = ref(null);
const currentImageIndex = ref(0);

/* MODAL */
const openProjectModal = (project) => {
  selectedProject.value = project;
  currentImageIndex.value = 0;
  document.body.style.overflow = "hidden";
};

const closeProjectModal = () => {
  selectedProject.value = null;
  currentImageIndex.value = 0;
  document.body.style.overflow = "";
};

/* ESC SUPPORT */
const handleKeydown = (e) => {
  if (e.key === "Escape") closeProjectModal();
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});

/* SUMMARY */
const getProjectSummary = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || "";

  const firstSentence = text.split(".")[0];
  return firstSentence.length > 120
    ? text.slice(0, 120) + "..."
    : firstSentence + ".";
};

const portfolioOptions = ref([
  {
    title: "Memora",
    description: `
    <p>
    Memora is a modern donations and event management platform that unifies payments, communication, and event coordination into one seamless system.</p>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1774948354/Screenshot_2026-03-31_at_9.11.47_AM_lu05oh.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1774948354/Screenshot_2026-03-31_at_9.11.21_AM_eoewkh.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1774948443/dashboard-light_kf2tzk.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1774948443/dashboard-dark_obxqrc.png",
    ],
    tools: [
      "TypeScript",
      "Next.js",
      "React",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "Tailwind CSS",
    ],
    links: [{ name: "VISIT SITE", link: "https://memora.joetech247.com" }],
  },
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
</script>
