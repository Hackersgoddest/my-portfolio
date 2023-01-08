<template>
    <div class="grid place-content-center bg-gradient-to-r from-gray-400 to-gray-500 py-8 truncate">
      <div class="mx-auto max-w-screen-xl container grid grid-cols-2 xs:grid-cols-3  md:grid-cols-4 lg:grid-cols-6 gap-8 px-8 text-gray-900 md:px-5">
        <a href="mailto: hackersgoddest@gmail.com">
          <span class="flex justify-center">
            <mail-icon />
            <span class="font-semibold">EMAIL</span>
          </span>
          <span class="flex justify-center">
            <span class="text-sm font-medium">hackersgoddest@gmail.com</span>
          </span>
        </a>
        <a href="tel:+233256287192">
          <span class="flex justify-center">
            <call-icon />
            <span class="font-semibold">PHONE</span>
          </span>
          <span class="flex justify-center">
            <span class="text-sm font-medium">0256287192</span>
          </span>
        </a>
        <a href="https://stackoverflow.com/users/17446079/frank-oppong-konadu" target="_blank">
          <span class="flex justify-center">
            <stack-icon />
            <span class="font-semibold">STACKOVERFLOW</span>
          </span>
          <div class="flex justify-center">
            <span class="text-sm font-medium">Frank Oppong Konadu</span>
          </div>
        </a>
        <a href="https://github.com/Hackersgoddest" target="_blank">
          <span class="flex justify-center">
            <github-icon />
            <span class="font-semibold">GITHUB</span>
          </span>
          <span class="flex justify-center">
            <span class="text-sm font-medium">Hackersgoddest</span>
          </span>
        </a>
        <a href="https://www.linkedin.com/in/frank-oppong-konadu-9286b523b/" target="_blank">
          <span class="flex justify-center">
            <linkedin-icon />
            <span class="font-semibold">LINKEDIN</span>
          </span>
          <span class="flex justify-center">
            <span class="text-sm font-medium">Frank Oppong Konadu</span>
          </span>
        </a>
        <a href="https://twitter.com/UndefineHacker" target="_blank">
          <span class="flex justify-center">
            <twitter-icon />
            <span class="font-semibold">TWITTER</span>
          </span>
          <span class="flex justify-center">
            <span class="text-sm font-medium">Hackersgoddest</span>
          </span>
        </a>
      </div>
    </div>
</template>

<script setup>
import {
  MailOutline as MailIcon,
  OpenOutline as OpenIcon,
  CallOutline as CallIcon,
  LogoStackoverflow as StackIcon,
  LogoGithub as GithubIcon,
  LogoLinkedin as LinkedinIcon,
  LogoTwitter as TwitterIcon,
} from "@vicons/ionicons5";
import { NGrid, NGi } from "naive-ui";
</script>

<style scoped>

div svg {
  width: 20px;
}

a:hover {
  color: white;
  transition: color 0.7s ease-in-out;
}

</style>