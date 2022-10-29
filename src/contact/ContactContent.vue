<template>
    <n-grid cols="20 s:20 m:22 l:24 xl:24 2xl:24" responsive="screen">
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
    <n-gi :span="20">
      <div class="main-container">
        <a href="mailto: hackersgoddest@gmail.com" class="notification">
          <div class="container">
            <mail-icon />
            <p>EMAIL</p>
          </div>
          <div class="container">
            <p href="">hackersgoddest@gmail.com</p>
            <open-icon />
          </div>
        </a>
        <a href="tel:+233256287192" class="notification">
          <div class="container">
            <call-icon />
            <p>PHONE</p>
          </div>
          <div class="container">
            <p>0256287192</p>
            <open-icon />
          </div>
        </a>
        <a href="https://stackoverflow.com/users/17446079/frank-oppong-konadu" target="_blank" class="notification">
          <div class="container">
            <stack-icon />
            <p>STACKOVERFLOW</p>
          </div>
          <div class="container">
            <p>Frank Oppong Konadu</p>
            <open-icon />
          </div>
        </a>
        <a href="https://github.com/Hackersgoddest" target="_blank" class="notification">
          <div class="container">
            <github-icon />
            <p>GITHUB</p>
          </div>
          <div class="container">
            <p>Hackersgoddest</p>
            <open-icon />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/frank-oppong-konadu-9286b523b/" target="_blank" class="notification">
          <div class="container">
            <linkedin-icon />
            <p>LINKEDIN</p>
          </div>
          <div class="container">
            <p>Frank Oppong Konadu</p>
            <open-icon />
          </div>
        </a>
        <a href="https://twitter.com/UndefineHacker" target="_blank" class="notification">
          <div class="container">
            <twitter-icon />
            <p>TWITTER</p>
          </div>
          <div class="container">
            <p>Hackersgoddest</p>
            <open-icon />
          </div>
        </a>
      </div>
    </n-gi>
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
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

.n-grid {
  background-color: rgba(125, 125, 125, 0.1);
}
.main-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.notification {
  text-decoration: none;
  color: #303031;
  width: 250px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 10px;
}

.container p {
  margin: 0;
  font-size: 15px;
}

div svg {
  width: 20px;
}


figcaption {
  font-size: 20px;
  font-weight: 700;
  color: rgb(136, 131, 131);
}

a:hover {
  color: #18A058;
}

</style>