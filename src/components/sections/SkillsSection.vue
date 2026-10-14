<template>
  <section class="py-section">
    <!-- A school blackboard in a wooden frame, in front of the school shoes:
         what the years of school (and after) left on the board. Wide, like a
         real classroom board, with the subjects in columns across it. -->
    <div class="container-custom">
      <div class="slate p-6 sm:p-10 lg:p-12">
        <div class="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <SectionHeader
            index="03"
            eyebrow="Toolkit"
            title="Skills & Technologies"
            description="A comprehensive toolkit of modern technologies for building exceptional digital experiences"
            :center="false"
          />

          <!-- Summary, chalked in the corner of the board -->
          <dl class="mb-10 grid shrink-0 grid-cols-3 gap-6 text-center sm:mb-12 lg:gap-10">
            <div class="flex flex-col">
              <dt class="text-xs text-fg-subtle sm:text-sm">Technologies</dt>
              <dd class="order-first mb-1 font-mono text-2xl font-bold text-primary-green xs:text-3xl">{{ totalSkills }}</dd>
            </div>
            <div class="flex flex-col">
              <dt class="text-xs text-fg-subtle sm:text-sm">Years</dt>
              <dd class="order-first mb-1 font-mono text-2xl font-bold text-primary-green xs:text-3xl">{{ yearsExperience }}+</dd>
            </div>
            <div class="flex flex-col">
              <dt class="text-xs text-fg-subtle sm:text-sm">Projects</dt>
              <dd class="order-first mb-1 font-mono text-2xl font-bold text-primary-green xs:text-3xl">{{ projects.length }}</dd>
            </div>
          </dl>
        </div>

        <!-- The subjects, in columns across the board -->
        <div class="grid gap-x-12 gap-y-9 border-t border-border/10 pt-9 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="tab in skillTabs" :key="tab.name" class="skill-item">
            <p class="mb-4 font-mono text-sm text-fg-faint">
              <span class="text-primary-green">//</span> {{ tab.label.toLowerCase() }}
            </p>
            <ul class="flex flex-wrap gap-x-5 gap-y-3">
              <li
                v-for="skill in tab.skills"
                :key="skill.name"
                class="group inline-flex items-center gap-2 font-mono text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                <img
                  :src="skill.src"
                  alt=""
                  class="h-4 w-4 object-contain transition-transform duration-200 group-hover:scale-110"
                  loading="lazy"
                />
                {{ skill.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, shallowRef } from "vue";
import SectionHeader from "../SectionHeader.vue";
import skillsData from "../../data/skills";
import projects from "../../data/projects";
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
