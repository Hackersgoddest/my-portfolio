<template>
  <div class="grid place-content-center bg-[#101014] pt-8 pb-16 truncate">
    <div
      class="mx-auto max-w-screen-xl container grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 px-8 text-white md:px-5"
    >
      <template v-for="item in contactOptions" :key="item.name">
        <a :href="item.link" target="_blank">
          <span class="flex justify-center gap-1">
            <n-icon size="20" :component="item.icon" />
            <span class="font-semibold">{{ item.name }}</span>
          </span>
          <span class="flex justify-center">
            <span class="text-sm font-medium">{{ item.description }}</span>
          </span>
        </a>
      </template>
    </div>
  </div>
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
import { NIcon } from "naive-ui";
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

<style scoped>
div svg {
  width: 20px;
}

a:hover {
  color: #57e9b1;
  transition: color 0.7s ease-in-out;
}
</style>
