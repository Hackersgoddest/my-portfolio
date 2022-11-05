<template>
    <n-grid cols="20 s:20 m:22 l:24 xl:24 2xl:24" responsive="screen">
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
    <n-gi :span="20">
      <div class="main-container">
        <a href="mailto: hackersgoddest@gmail.com" class="notification">
          <span class="container">
            <mail-icon />
            <span>EMAIL</span>
          </span>
          <span class="container">
            <span href="">hackersgoddest@gmail.com</span>
            <open-icon />
          </span>
        </a>
        <a href="tel:+233256287192" class="notification">
          <span class="container">
            <call-icon />
            <span>PHONE</span>
          </span>
          <span class="container">
            <span>0256287192</span>
            <open-icon />
          </span>
        </a>
        <a href="https://stackoverflow.com/users/17446079/frank-oppong-konadu" target="_blank" class="notification">
          <span class="container">
            <stack-icon />
            <span>STACKOVERFLOW</span>
          </span>
          <div class="container">
            <span>Frank Oppong Konadu</span>
            <open-icon />
          </div>
        </a>
        <a href="https://github.com/Hackersgoddest" target="_blank" class="notification">
          <span class="container">
            <github-icon />
            <span>GITHUB</span>
          </span>
          <span class="container">
            <span>Hackersgoddest</span>
            <open-icon />
          </span>
        </a>
        <a href="https://www.linkedin.com/in/frank-oppong-konadu-9286b523b/" target="_blank" class="notification">
          <span class="container">
            <linkedin-icon />
            <span>LINKEDIN</span>
          </span>
          <span class="container">
            <span>Frank Oppong Konadu</span>
            <open-icon />
          </span>
        </a>
        <a href="https://twitter.com/UndefineHacker" target="_blank" class="notification">
          <span class="container">
            <twitter-icon />
            <span>TWITTER</span>
          </span>
          <span class="container">
            <span>Hackersgoddest</span>
            <open-icon />
          </span>
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
  padding: 10px 0;
}
@media screen and (min-width: 600px) {
  .main-container {
    height: 200px;
  }
}

.notification {
  text-decoration: none;
  color: #303031;
  width: 200px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

}

.container {
  display: flex;
  align-items: center;
}

.container span {
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