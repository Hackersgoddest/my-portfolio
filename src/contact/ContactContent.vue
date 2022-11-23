<template>
    <n-grid class="bg-gray-300" cols="20 s:20 m:22 l:24 xl:24 2xl:24" responsive="screen">
    <n-gi class="first-span hidden md:block"></n-gi>
    <n-gi class="second-span hidden lg:block"></n-gi>
    <n-gi :span="20">
      <div class="flex justify-evenly flex-wrap py-14 gap-8">
        <a href="mailto: hackersgoddest@gmail.com" class="flex w-44 sm:max-w-fit items-center flex-col">
          <span class="flex items-center">
            <mail-icon />
            <span class="font-semibold">EMAIL</span>
          </span>
          <span class="flex items-center">
            <span class="text-sm font-medium">hackersgoddest@gmail.com</span>
            <open-icon />
          </span>
        </a>
        <a href="tel:+233256287192" class="flex w-44 sm:max-w-fit items-center flex-col">
          <span class="flex items-center">
            <call-icon />
            <span class="font-semibold">PHONE</span>
          </span>
          <span class="flex items-center">
            <span class="text-sm font-medium">0256287192</span>
            <open-icon />
          </span>
        </a>
        <a href="https://stackoverflow.com/users/17446079/frank-oppong-konadu" target="_blank" class="flex w-44 sm:max-w-fit items-center flex-col">
          <span class="flex items-center">
            <stack-icon />
            <span class="font-semibold">STACKOVERFLOW</span>
          </span>
          <div class="flex items-center">
            <span class="text-sm font-medium">Frank Oppong Konadu</span>
            <open-icon />
          </div>
        </a>
        <a href="https://github.com/Hackersgoddest" target="_blank" class="flex w-44 sm:max-w-fit items-center flex-col">
          <span class="flex items-center">
            <github-icon />
            <span class="font-semibold">GITHUB</span>
          </span>
          <span class="flex items-center">
            <span class="text-sm font-medium">Hackersgoddest</span>
            <open-icon />
          </span>
        </a>
        <a href="https://www.linkedin.com/in/frank-oppong-konadu-9286b523b/" target="_blank" class="flex w-44 sm:max-w-fit items-center flex-col">
          <span class="flex items-center">
            <linkedin-icon />
            <span class="font-semibold">LINKEDIN</span>
          </span>
          <span class="flex items-center">
            <span class="text-sm font-medium">Frank Oppong Konadu</span>
            <open-icon />
          </span>
        </a>
        <a href="https://twitter.com/UndefineHacker" target="_blank" class="flex w-44 sm:max-w-fit items-center flex-col">
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
    </n-gi>
    <n-gi class="hidden md:block"></n-gi>
    <n-gi class="hidden lg:block"></n-gi>
  </n-grid>


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