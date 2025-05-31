<template>
  <n-grid
    class="max-w-screen-xl mx-auto px-5"
    cols="2 s:3 m:4 l:5 xl:6 2xl:7"
    responsive="screen"
    :x-gap="32"
    :y-gap="32"
    :item-responsive="true"
  >
    <n-grid-item v-for="item in contactOptions" :key="item.name">
      <a
        :href="item.link"
        target="_blank"
        class="text-white hover:text-[#18A058] hover:transition-colors hover:duration-700 hover:ease-in-out"
      >
        <span class="flex justify-center gap-1">
          <n-icon size="20" :component="item.icon" />
          <span class="font-semibold">{{ item.name }}</span>
        </span>
        <span class="flex justify-center">
          <span class="text-sm font-medium">{{ item.description }}</span>
        </span>
      </a>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import {
  MailOutline as MailIcon,
  CallOutline as CallIcon,
  LogoStackoverflow as StackIcon,
  LogoGithub as GithubIcon,
  LogoLinkedin as LinkedinIcon,
  LogoTwitter as TwitterIcon,
  LogoInstagram as InstagramIcon,
} from "@vicons/ionicons5";
import { NIcon, NGrid, NGridItem } from "naive-ui";
import { shallowRef } from "vue";

const contactOptions = shallowRef([
  {
    name: "EMAIL",
    link: "mailto: hackersgoddest@gmail.com",
    description: "hackersgoddest@gmail.com",
    icon: MailIcon,
  },
  {
    name: "PHONE",
    link: "tel:+233256287192",
    description: "0256287192",
    icon: CallIcon,
  },
  {
    name: "INSTAGRAM",
    link: "https://www.instagram.com/hackersgoddest/",
    description: "Hackersgoddest",
    icon: InstagramIcon,
  },
  {
    name: "TWITTER",
    link: "https://twitter.com/UndefineHacker",
    description: "Hackersgoddest",
    icon: TwitterIcon,
  },
  {
    name: "LINKEDIN",
    link: "https://www.linkedin.com/in/frank-oppong-konadu-9286b523b/",
    description: "Frank Oppong Konadu",
    icon: LinkedinIcon,
  },
  {
    name: "STACKOVERFLOW",
    link: "https://stackoverflow.com/users/17446079/frank-oppong-konadu",
    description: "Frank Oppong Konadu",
    icon: StackIcon,
  },
  {
    name: "GITHUB",
    link: "https://github.com/Hackersgoddest",
    description: "Hackersgoddest",
    icon: GithubIcon,
  },
]);
</script>

<style scoped></style>
