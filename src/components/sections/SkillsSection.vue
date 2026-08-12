<template>
  <section class="py-section">
    <div class="container-custom">
      <SectionHeader
        index="03"
        eyebrow="Toolkit"
        title="Skills & Technologies"
        description="A comprehensive toolkit of modern technologies for building exceptional digital experiences"
      />

      <!-- Stacked, comment-annotated skill listing - a stack dump, not a browsable widget -->
      <div class="mx-auto max-w-3xl space-y-10">
        <div v-for="tab in skillTabs" :key="tab.name" class="skill-item">
          <p class="mb-4 font-mono text-sm text-fg-faint">
            <span class="text-primary-green">//</span> {{ tab.label.toLowerCase() }}
          </p>
          <div class="flex flex-wrap gap-x-6 gap-y-3">
            <span
              v-for="skill in tab.skills"
              :key="skill.name"
              class="group inline-flex items-center gap-2 font-mono text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
            >
              <img
                :src="skill.src"
                :alt="skill.name"
                class="h-4 w-4 object-contain transition-transform duration-200 group-hover:scale-110"
                loading="lazy"
              />
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-8 border-t border-border/20 dark:border-border/10 pt-10 text-center xs:grid-cols-3">
        <div>
          <div class="mb-1 font-mono text-2xl font-bold text-primary-green xs:text-3xl">{{ totalSkills }}+</div>
          <div class="text-xs text-fg-subtle sm:text-sm">Technologies</div>
        </div>
        <div>
          <div class="mb-1 font-mono text-2xl font-bold text-primary-green xs:text-3xl">{{ yearsExperience }}+</div>
          <div class="text-xs text-fg-subtle sm:text-sm">Years Experience</div>
        </div>
        <div>
          <div class="mb-1 font-mono text-2xl font-bold text-primary-green xs:text-3xl">10+</div>
          <div class="text-xs text-fg-subtle sm:text-sm">Projects Completed</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, shallowRef } from "vue";
import SectionHeader from "../SectionHeader.vue";
import skillsData from "../../data/skills";
import type { SkillTab } from "../../types";

const skillTabs = shallowRef<SkillTab[]>([
  { name: "frontend", label: "Frontend", skills: skillsData.frontend },
  { name: "backend", label: "Backend", skills: skillsData.backend },
  { name: "mobile", label: "Mobile", skills: skillsData.mobile },
  { name: "database", label: "Database", skills: skillsData.database },
  { name: "cloud", label: "Cloud & DevOps", skills: skillsData.cloud },
  { name: "tools", label: "Tools", skills: skillsData.tools },
]);

const yearsExperience = new Date().getFullYear() - 2022;

const totalSkills = computed(() => {
  const all = skillTabs.value.flatMap((tab) => tab.skills);
  return new Set(all.map((skill) => skill.name)).size;
});
</script>
