<template>
  <div class="bg-[#101014] fixed">
    <div class="container mx-auto max-w-screen-xl px-5">
      <nav class="flex justify-between h-16 items-center">
        <div class="flex items-center">
          <!-- <n-p class="font-medium text-white text-lg lg:text-xl"
            >Hackersgoddest</n-p
          > -->
          <n-gradient-text
            gradient="linear-gradient(90deg, white 0%, gray 50%, green 100%)"
            class="font-medium text-lg lg:text-xl"
          >
          Hackersgoddest
          </n-gradient-text>
        </div>
        <ul
          :class="[openMenu ? 'translate-x-0' : 'translate-x-[-100vw]']"
          class="block absolute left-0 top-16 bg-[#101014] w-screen transition-transform pb-3 pl-2 pr-4 sm:px-0 sm:translate-x-0 sm:w-auto sm:static gap-2 sm:inline-flex sm:items-center sm:pb-0"
        >
          <template v-for="(item, index) in navigation" :key="item.index">
            <li>
              <n-a
                @click="changeActiveMenu(item.name)"
                :class="[
                  item.current
                    ? 'bg-[#213733] text-[#57e9b1]'
                    : 'text-gray-300 hover:text-[#57e9b1]',
                  'block px-3 py-1 mb-2 sm:mb-0 rounded-md text-sm font-medium transition-colors duration-1000 ease-in-out',
                ]"
                :href="item.href"
                >{{ item.name }}
              </n-a>
            </li>
          </template>
        </ul>
      </nav>
    </div>
    <button
      @click="openMenu = !openMenu"
      class="absolute top-2.5 right-2 outline-none"
    >
      <template
        v-show="!openMenu"
        class="bar inline-flex items-center rounded-md px-1 py-2 hover:bg-[#213733] z-10 sm:hidden w-10 flex-col justify-center transition-colors duration-1000 ease-in-out"
      >
        <div class="bg-gray-400 h-0.5 w-4 mb-1 rounded-xl"></div>
        <div class="bg-gray-400 h-0.5 w-4 mb-1 rounded-xl"></div>
        <div class="bg-gray-400 h-0.5 w-4 mb-0 rounded-xl"></div>
      </template>
      <template
        v-show="openMenu"
        class="bar inline-flex items-center rounded-md px-1 py-2 bg-[#213733] z-10 sm:hidden w-10 flex-col justify-center"
      >
        <div class="h-0.5 rounded-xl mb-1"></div>
        <div class="bg-gray-400 h-0.5 w-4 rounded-xl -rotate-45"></div>
        <div class="bg-gray-400 h-0.5 w-4 mb-1 rounded-xl rotate-45"></div>
      </template>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { NP, NA, NGradientText } from "naive-ui";
const navigation = ref([
  { name: "Home", href: "#home", current: true },
  { name: "Services", href: "#service", current: false },
  { name: "Skills", href: "#skills", current: false },
  { name: "Portfolio", href: "#portfolio", current: false },
  { name: "Contact", href: "#contact", current: false },
]);
let openMenu = ref(false);

function changeActiveMenu(element) {
  navigation.value.forEach((menu) => {
    if (menu.name === element) menu.current = true;
    else menu.current = false;
    openMenu.value = false;
  });
}
</script>

<style scoped>
.bar:hover div {
  background-color: #57e9b1;
}
</style>
