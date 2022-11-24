<template>
    <div class="grid place-content-center bg-gray-200 py-8 truncate">
      <div class="mx-auto max-w-screen-xl container grid grid-cols-2  md:grid-cols-3 lg:grid-cols-6 gap-8 px-8 md:px-5">
        <a href="tel:+233256287192">
          <span class="flex items-center">
            <call-icon />
            <span class="font-semibold">PHONE</span>
          </span>
          <span class="flex items-center">
            <span class="text-sm font-medium">0256287192</span>
            <open-icon />
          </span>
        </a>
        <a href="mailto: hackersgoddest@gmail.com">
          <span class="flex items-center">
            <mail-icon />
            <span class="font-semibold">EMAIL</span>
          </span>
          <span class="flex items-center">
            <span class="text-sm font-medium">hackersgoddest@gmail.com</span>
            <open-icon />
          </span>
        </a>
        <a href="https://stackoverflow.com/users/17446079/frank-oppong-konadu" target="_blank">
          <span class="flex items-center">
            <stack-icon />
            <span class="font-semibold">STACKOVERFLOW</span>
          </span>
          <div class="flex items-center">
            <span class="text-sm font-medium">Frank Oppong Konadu</span>
            <open-icon />
          </div>
        </a>
        <a href="https://github.com/Hackersgoddest" target="_blank">
          <span class="flex items-center">
            <github-icon />
            <span class="font-semibold">GITHUB</span>
          </span>
          <span class="flex items-center">
            <span class="text-sm font-medium">Hackersgoddest</span>
            <open-icon />
          </span>
        </a>
        <a href="https://www.linkedin.com/in/frank-oppong-konadu-9286b523b/" target="_blank">
          <span class="flex items-center">
            <linkedin-icon />
            <span class="font-semibold">LINKEDIN</span>
          </span>
          <span class="flex items-center">
            <span class="text-sm font-medium">Frank Oppong Konadu</span>
            <open-icon />
          </span>
        </a>
        <a href="https://twitter.com/UndefineHacker" target="_blank">
          <span class="flex items-center">
            <twitter-icon />
            <span class="font-semibold">TWITTER</span>
          </span>
          <span class="flex items-center">
            <span class="text-sm font-medium">Hackersgoddest</span>
            <open-icon />
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
  color: #18A058;
}

</style>