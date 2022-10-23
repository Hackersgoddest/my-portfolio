<template>
  <n-grid :cols="24">
  <n-gi :span="2"></n-gi>
    <n-gi :span="4">
      <a href="#app" class="center-avatar">
        <span @click="selectAndExpand('go-back-home')" class="center-avatar">
            <n-avatar>
              <n-icon>
                <md-cash />
              </n-icon>
            </n-avatar>
            <n-gradient-text :gradient="{
              from: 'rgb(85, 85, 85)',
              to: 'rgb(170, 170, 170)',
            }">Hackersgoddest</n-gradient-text>
        </span>
      </a>

    </n-gi>
    <n-gi :span="2"></n-gi>
    <n-gi class="is-end" :span="14">
      <n-menu mode="horizontal" ref="menuInstRef" v-model:value="selectedKeyRef" :options="menuOptions"
        :accordion="accordionRef" />
    </n-gi>
    <n-gi :span="2"></n-gi>
  </n-grid>

</template>

<script setup>
import { h, ref } from "vue";
import { NIcon, NMenu, NGrid, NGi, NAvatar, NGradientText, NInput } from "naive-ui";
import {
  PersonOutline as PersonIcon,
  PeopleOutline as ServiceIcon,
  CallOutline as ContactIcon,
  LaptopOutline as WorkIcon,
  HomeOutline as HomeIcon,
} from "@vicons/ionicons5";
import { MdCash } from "@vicons/ionicons4";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const accordionRef = ref(true);
const selectedKeyRef = ref("go-back-home");
const menuInstRef = ref(null);
const selectAndExpand = (key) => {
  selectedKeyRef.value = key;
  menuInstRef.value?.showOption(key);
}

const menuOptions = [
  {
    label: () =>
      h(
        'a',
        {
          href: '#home',
        },
        'Home'
      ),
    key: "go-back-home",
    icon: renderIcon(HomeIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '#service',
        },
        'Service'
      ),
    key: "go-to-service",
    icon: renderIcon(ServiceIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '#skills',
        },
        'Skills'
      ),
    key: "go-to-skills",
    icon: renderIcon(WorkIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '#blog',
        },
        'Blog'
      ),
    key: "go-to-blog",
    icon: renderIcon(PersonIcon),
  },
  {
    label: () =>
      h(
        'a',
        {
          href: '#contact',
        },
        'Contact'
      ),
    key: "go-to-contact",
    icon: renderIcon(ContactIcon),
  },
];
</script>
<style scoped>

.n-grid {
  height: 60px;
  display: flex;
  align-items: center;
}
.is-end {
  text-align: end;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.n-gradient-text {
  font-size: 20px;
  cursor: pointer;
}

.n-avatar {
  height: 25px;
  margin-right: 5px;
}

.center-avatar {
  display: flex;
  align-items: center;
  text-decoration: none;
}


.n-input {
  width: 240px;
}
</style>
