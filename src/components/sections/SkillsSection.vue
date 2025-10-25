<template>
  <section class="py-section bg-background-primary">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-h2 font-bold text-white mb-4">
          Skills & Technologies
        </h2>
        <p class="text-body-lg text-gray-300 max-w-2xl mx-auto">
          A comprehensive toolkit of modern technologies for building exceptional digital experiences
        </p>
      </div>
      
      <!-- Skills Content -->
      <div class="max-w-6xl mx-auto">
        <!-- Responsive Tab Navigation -->
        <div class="flex justify-center mb-8 md:mb-12 px-4">
          <div class="w-full max-w-4xl">
            <div class="p-1 md:p-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <!-- Mobile: Scrollable tabs -->
              <div class="flex md:hidden overflow-x-auto scrollbar-hide gap-1 pb-1">
                <button
                  v-for="(tab, index) in skillTabs"
                  :key="tab.name"
                  @click="activeTab = tab.name"
                  :class="[
                    'flex-shrink-0 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap',
                    activeTab === tab.name
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  ]"
                >
                  {{ tab.label }}
                </button>
              </div>
              
              <!-- Desktop: Centered grid -->
              <div class="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-2">
                <button
                  v-for="(tab, index) in skillTabs"
                  :key="tab.name"
                  @click="activeTab = tab.name"
                  :class="[
                    'px-4 lg:px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 text-center',
                    activeTab === tab.name
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  ]"
                >
                  {{ tab.label }}
                </button>
              </div>
            </div>
            
            <!-- Mobile: Tab indicator dots -->
            <div class="flex md:hidden justify-center mt-3 gap-1">
              <div
                v-for="(tab, index) in skillTabs"
                :key="`dot-${tab.name}`"
                :class="[
                  'w-2 h-2 rounded-full transition-all duration-300',
                  activeTab === tab.name
                    ? 'bg-emerald-500 w-6'
                    : 'bg-white/30'
                ]"
              ></div>
            </div>
          </div>
        </div>

        <!-- Skills Grid -->
        <div class="relative">
          <div 
            v-for="tab in skillTabs"
            :key="tab.name"
            v-show="activeTab === tab.name"
            class="transition-opacity duration-300"
          >
            <n-grid 
              cols="2 xs:3 s:4 m:5 l:6 xl:8"
              responsive="screen"
              :x-gap="16"
              :y-gap="16"
            >
              <n-grid-item 
                v-for="skill in tab.skills" 
                :key="skill.name"
                class="skill-item"
              >
                <div 
                  class="skill-card-wrapper group relative"
                  @mouseenter="hoveredSkill = skill"
                  @mouseleave="hoveredSkill = null"
                >
                  <!-- Simple Skill Card - Clean Design -->
                  <div class="skill-card glass-card rounded-xl p-4 text-center cursor-pointer border border-white/10 hover:border-primary-green/50 transition-all duration-300 hover:transform hover:translate-y-[-2px] hover:shadow-lg hover:bg-white/[0.05]">
                    <!-- Skill Icon -->
                    <div class="flex justify-center mb-3">
                      <div 
                        class="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                      >
                        <img 
                          v-if="skill.src"
                          :src="skill.src" 
                          :alt="skill.name"
                          class="w-8 h-8 object-contain"
                        />
                        <div 
                          v-else
                          class="w-8 h-8 bg-gray-600 rounded-md flex items-center justify-center text-xs text-gray-300"
                        >
                          {{ skill.name.charAt(0) }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Skill Name -->
                    <div class="text-xs text-gray-300 font-medium">
                      {{ skill.name }}
                    </div>
                  </div>

                  <!-- Enhanced Details Card on Hover - Cleaner Animation -->
                  <div 
                    v-if="hoveredSkill === skill"
                    class="absolute top-0 left-0 w-full z-20 pointer-events-none"
                  >
                    <div class="skill-detail-card glass-card border border-primary-green/50 rounded-xl p-4 shadow-2xl transition-all duration-300 ease-out transform">
                      <div class="text-center">
                        <!-- Enhanced Icon -->
                        <div class="flex justify-center mb-3">
                          <div class="w-16 h-16 flex items-center justify-center bg-primary-green/10 rounded-xl">
                            <img 
                              v-if="skill.src"
                              :src="skill.src" 
                              :alt="skill.name"
                              class="w-10 h-10 object-contain"
                            />
                            <div 
                              v-else
                              class="w-10 h-10 bg-gray-600 rounded-md flex items-center justify-center text-sm text-gray-300"
                            >
                              {{ skill.name.charAt(0) }}
                            </div>
                          </div>
                        </div>
                        
                        <!-- Skill Name -->
                        <h4 class="text-sm font-semibold text-white mb-2">
                          {{ skill.name }}
                        </h4>
                        
                        <!-- Skill Description -->
                        <p class="text-xs text-gray-300 mb-3 leading-relaxed">
                          {{ getSkillDescription(skill.name) }}
                        </p>
                        
                        <!-- Experience Level -->
                        <div class="mb-3">
                          <div class="flex justify-between items-center mb-1">
                            <span class="text-xs text-gray-400">Experience</span>
                            <span class="text-xs text-primary-green font-medium">{{ getSkillLevel(skill.name) }}</span>
                          </div>
                          <div class="w-full bg-white/10 rounded-full h-1.5">
                            <div 
                              class="bg-gradient-to-r from-primary-green to-primary-green-light h-1.5 rounded-full transition-all duration-700 ease-out"
                              :style="{ width: getSkillPercentage(skill.name) + '%' }"
                            ></div>
                          </div>
                        </div>
                        
                        <!-- Projects Count -->
                        <div class="flex items-center justify-center gap-2 text-xs">
                          <div class="w-2 h-2 bg-primary-green rounded-full"></div>
                          <span class="text-gray-300">{{ getProjectCount(skill.name) }}+ projects</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </n-grid-item>
            </n-grid>
          </div>
        </div>

        <!-- Skill Summary -->
        <div class="mt-16">
          <div class="glass-card p-8 rounded-2xl">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div class="text-3xl font-bold text-primary-green mb-2">
                  {{ getTotalSkills() }}+
                </div>
                <div class="text-caption text-gray-400">
                  Technologies
                </div>
              </div>
              <div>
                <div class="text-3xl font-bold text-primary-green mb-2">
                  {{ new Date().getFullYear() - 2022 }}+
                </div>
                <div class="text-caption text-gray-400">
                  Years Experience
                </div>
              </div>
              <div>
                <div class="text-3xl font-bold text-primary-green mb-2">
                  50+
                </div>
                <div class="text-caption text-gray-400">
                  Projects Completed
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
import { ref, shallowRef } from "vue";
import { NGrid, NGridItem } from "naive-ui";
import skillsData from "../../data/skills";

const activeTab = ref('frontend');
const hoveredSkill = ref(null);

const skillTabs = shallowRef([
  {
    name: 'frontend',
    label: 'Frontend',
    skills: skillsData.frontend
  },
  {
    name: 'backend',
    label: 'Backend',
    skills: skillsData.backend
  },
  {
    name: 'mobile',
    label: 'Mobile',
    skills: skillsData.mobile
  },
  {
    name: 'database',
    label: 'Database',
    skills: skillsData.database
  },
  {
    name: 'cloud',
    label: 'Cloud & DevOps',
    skills: skillsData.cloud
  },
  {
    name: 'tools',
    label: 'Tools',
    skills: skillsData.tools
  }
]);

// Skill details data
const skillDetails = {
  // Frontend Technologies
  'HTML5': { description: 'Semantic markup language for web structure', level: 'Expert', percentage: 100, projects: 30 },
  'CSS3': { description: 'Advanced styling with animations and responsive design', level: 'Expert', percentage: 95, projects: 30 },
  'JavaScript': { description: 'Dynamic programming language for interactive web apps', level: 'Expert', percentage: 95, projects: 25 },
  'TypeScript': { description: 'Typed superset of JavaScript for scalable applications', level: 'Advanced', percentage: 85, projects: 12 },
  'React.js': { description: 'Component-based library for building user interfaces', level: 'Expert', percentage: 90, projects: 15 },
  'Vue.js': { description: 'Progressive framework for modern web applications', level: 'Expert', percentage: 95, projects: 20 },
  'Next.js': { description: 'React framework with SSR and static generation', level: 'Advanced', percentage: 85, projects: 8 },
  'Nuxt.js': { description: 'Vue.js framework for universal applications', level: 'Advanced', percentage: 80, projects: 7 },
  'Tailwind CSS': { description: 'Utility-first CSS framework for rapid development', level: 'Expert', percentage: 90, projects: 18 },
  'Naive UI': { description: 'Vue 3 component library with TypeScript support', level: 'Advanced', percentage: 80, projects: 5 },
  
  // Backend Technologies
  'Node.js': { description: 'JavaScript runtime for scalable server applications', level: 'Advanced', percentage: 85, projects: 15 },
  'Express.js': { description: 'Fast, minimalist web framework for Node.js', level: 'Advanced', percentage: 80, projects: 12 },
  'Fastify': { description: 'High-performance web framework for Node.js', level: 'Intermediate', percentage: 70, projects: 6 },
  'Nest.js': { description: 'Progressive Node.js framework with TypeScript', level: 'Advanced', percentage: 75, projects: 8 },
  'FeathersJS': { description: 'Real-time API framework for modern applications', level: 'Intermediate', percentage: 65, projects: 4 },
  'Python': { description: 'Versatile language for web development and automation', level: 'Advanced', percentage: 80, projects: 10 },
  'Django': { description: 'High-level Python web framework', level: 'Intermediate', percentage: 70, projects: 6 },
  'Java': { description: 'Enterprise-grade programming language', level: 'Intermediate', percentage: 65, projects: 5 },
  'C#': { description: 'Modern object-oriented programming language', level: 'Intermediate', percentage: 60, projects: 4 },
  '.NET': { description: 'Cross-platform framework for building applications', level: 'Intermediate', percentage: 60, projects: 4 },
  
  // Mobile Technologies
  'React Native': { description: 'Cross-platform mobile development with React', level: 'Advanced', percentage: 80, projects: 8 },
  'Flutter': { description: 'Google\'s UI toolkit for native mobile apps', level: 'Intermediate', percentage: 70, projects: 6 },
  'Expo': { description: 'Platform for universal React applications', level: 'Advanced', percentage: 75, projects: 8 },
  
  // Database Technologies
  'MongoDB': { description: 'NoSQL database for flexible data storage', level: 'Advanced', percentage: 80, projects: 12 },
  'MySQL': { description: 'Popular relational database management system', level: 'Advanced', percentage: 85, projects: 14 },
  'PostgreSQL': { description: 'Advanced open-source relational database', level: 'Intermediate', percentage: 75, projects: 8 },
  'Redis': { description: 'In-memory data structure store for caching and sessions', level: 'Advanced', percentage: 80, projects: 10 },
  
  // Cloud & DevOps
  'AWS': { description: 'Comprehensive cloud computing platform', level: 'Intermediate', percentage: 70, projects: 8 },
  'Digital Ocean': { description: 'Simple cloud infrastructure for developers', level: 'Advanced', percentage: 80, projects: 12 },
  'Docker': { description: 'Containerization platform for application deployment', level: 'Intermediate', percentage: 65, projects: 6 },
  
  // Tools & Version Control
  'Git': { description: 'Distributed version control system', level: 'Expert', percentage: 95, projects: 30 },
  'GitHub': { description: 'Platform for version control and collaboration', level: 'Expert', percentage: 95, projects: 25 }
};

const getSkillDescription = (skillName) => {
  return skillDetails[skillName]?.description || 'Powerful technology for modern development';
};

const getSkillLevel = (skillName) => {
  return skillDetails[skillName]?.level || 'Intermediate';
};

const getSkillPercentage = (skillName) => {
  return skillDetails[skillName]?.percentage || 75;
};

const getProjectCount = (skillName) => {
  return skillDetails[skillName]?.projects || 5;
};

const getTotalSkills = () => {
  const allSkills = [...skillsData.frontend, ...skillsData.backend, ...skillsData.mobile, ...skillsData.database, ...skillsData.cloud, ...skillsData.tools];
  const uniqueSkills = allSkills.reduce((acc, current) => {
    if (!acc.some(skill => skill.name === current.name)) {
      acc.push(current);
    }
    return acc;
  }, []);
  return uniqueSkills.length;
};
</script>
