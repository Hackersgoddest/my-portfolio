<template>
  <section class="bg-[#101014]">
    <Header :title="title" :description="description" id="Services" />
    
    <!-- Service Content -->
    <n-grid
      class="max-w-screen-xl mx-auto px-5"
      cols="1 s:2 m:3"
      responsive="screen"
      :x-gap="32"
      :y-gap="32"
      :item-responsive="true"
    >
      <n-grid-item v-for="service in serviceOptions" :key="service.title">
        <n-card
          :title="service.title"
          size="large"
          :bordered="false"
          :theme-overrides="darkTheme"
          class="rounded-lg bg-[#212121]"
        >
          <template #header-extra>
            <n-icon size="40" color="#18A058" :component="service.icon" />
          </template>
          <n-p class="text-[#727174]">{{ service.description }}</n-p>
          <n-avatar-group :options="service.tools" :size="40" :max="5" theme-overrides="darkTheme">
            <template #avatar="{ option: { name, src } }">
              <n-tooltip>
                <template #trigger>
                  <n-avatar :src="src" :theme-overrides="darkTheme" class="bg-white border-0" />
                </template>
                {{ name }}
              </n-tooltip>
            </template>
            <template #rest="{ options: restOptions, rest }">
              <n-dropdown
                :options="createDropdownOptions(restOptions)"
                placement="top"
              >
                <n-avatar :theme-overrides="darkTheme">+{{ rest }}</n-avatar>
              </n-dropdown>
            </template>
          </n-avatar-group>
        </n-card>
      </n-grid-item>
    </n-grid>
  </section>
</template>

<script setup>
import {
  GlobeOutline as InternetIcon,
  PhonePortraitOutline as PhoneIcon,
  DesktopOutline as DesktopIcon,
} from "@vicons/ionicons5";
import {
  NIcon,
  NP,
  NGrid,
  NGridItem,
  NCard,
  darkTheme,
  NAvatar,
  NAvatarGroup,
  NTooltip,
  NDropdown,
} from "naive-ui";
import Header from "../Header.vue";
import { shallowRef } from "vue";

const title = shallowRef('SERVICES');
const description = shallowRef('What i Offer');

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
        name: "Nest",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684787/nestjs-svgrepo-com_osupei.svg",
      },
      {
        name: "PostgreSQL",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684933/postgresql-logo-svgrepo-com_zg0lca.svg",
      },
      {
        name: "Node",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748685426/nodejs-1-logo-svgrepo-com_q4uvtf.svg",
      },
      {
        name: "Django",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748685417/django-fill-svgrepo-com_drlint.svg",
      },
      {
        name: "Vue",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684957/vue-svgrepo-com_u7evpd.svg",
      },
      {
        name: "Tailwind CSS",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748685190/tailwindcss-icon-svgrepo-com_fewqn7.svg",
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
        name: "Express",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684756/express-svgrepo-com_d26izs.svg",
      },
      {
        name: "Fastify",
        src: "https://res.cloudinary.com/dfm07q3n0/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1748684773/fastify-svgrepo-com_fa3mg5.svg",
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

const createDropdownOptions = (options) =>
  options.map((option) => ({
    key: option.name,
    label: option.name,
  }));
</script>
