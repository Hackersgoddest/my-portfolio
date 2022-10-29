<template>
  <n-grid cols="20 s:20 m:22 l:24 xl:24 2xl:24" responsive="screen">
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
    <n-gi class="avatar" :span="4">
      <a href="#app" class="center-avatar" @click="closeMenu = false">
        <span @click="selectAndExpand('go-back-home')" class="center-avatar">
          <n-avatar>
            <n-icon>
              <md-cash />
            </n-icon>
          </n-avatar>
          <a class="header-title">Hackersgoddest</a>
        </span>
      </a>

    </n-gi>
    <n-gi :span="2"></n-gi>
    <n-gi class="is-end menu" :span="14">
    <template class="svg-container" @click="toggleSideMenu">
      <a :class="(closeMenu) ? 'close' : 'open'">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"
          data-v-64fbeb85="">
          <path fill="#fff" stroke="#7a7a7a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"
            d="M80 160h352"></path>
          <path fill="#fff" stroke="#7a7a7a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"
            d="M80 256h352"></path>
          <path fill="#fff" stroke="#7a7a7a" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"
            d="M80 352h352"></path>
        </svg>
      </a>
      <a :class="(closeMenu) ? 'open':'close'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#7a7a7a"
          class="block h-6 w-6" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </a>
    </template>
      <n-menu @click="toggleSideMenu" :class="(closeMenu) ? 'open' : 'close'" :mode="(changeToVerticalMode) ? 'vertical' : 'horizontal'" ref="menuInstRef"
        v-model:value="selectedKeyRef" :options="menuOptions" :accordion="accordionRef" />
    </n-gi>
    <n-gi class="first-span"></n-gi>
    <n-gi class="second-span"></n-gi>
  </n-grid>

</template>

<script setup>
import { h, ref, watch } from "vue";
import { NIcon, NMenu, NGrid, NGi, NAvatar} from "naive-ui";
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
          href: '#portfolio',
        },
        'Portfolio'
      ),
    key: "go-to-portfolio",
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


// for toggling and manipulating the menubar
let closeMenu = ref(false);

function toggleSideMenu() {
  closeMenu.value = !closeMenu.value;
}


let screenWidth = window.innerHeight;
let changeToVerticalMode = ref(false);
watch(
  screenWidth,
  (newValue) => {
    if(newValue.value < 901) {
      changeToVerticalMode.value = true;
    }
    else {
      changeToVerticalMode.value = false;
    }
  }
  );

</script>
<style scoped>
.svg-container {
  display: none;
}


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

.header-title {
  font-size: 1.2rem;
  color: #777;
}

@media only screen and (max-width: 900px) {
  .svg-container {
    display: block;
    position: absolute;
    right: 10px;
    top: 12px;
  }

  .svg-container .close {
    display: none;
  }

  .svg-container .open {
    display: block;
  }

  .svg-container svg {
    width: 30px;
    padding: 5px;
    cursor: pointer;
  }

  .n-menu {
    display: none;
    position: absolute;
    background-color: white;
    width: 300px;
  }

  .is-end {
    text-align: start;
  }

  .n-menu .n-menu-item {
    margin-top: 6px;
  }
  

  .n-menu.open {
    display: block;
    z-index: 5;
    left: 0;
    top: 60px;
  }

  .n-menu.close {
    display: none;
  }



}
</style>
