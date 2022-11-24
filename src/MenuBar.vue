<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="container mx-auto max-w-screen-xl px-5">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img class="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=500"
              alt="Hackersgoddest logo" />
            <img class="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=500"
              alt="Hackersgoddest logo" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4" v-if="mount">
            <template 
            v-for="(item, index) in navigation" :key="item.name"
            >
            <a 
            @click="changeCurrent(index)"
             :aria-current="item.current ? 'page' : undefined"
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium']"
                :href="item.href">{{ item.name }}</a>
            </template>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" src="/frank.jpg" alt="My Picture" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Curriculum
                  Vitae</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <a href="#portfolio"
                  :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Porfolio</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <a href="#contact"
                  :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Contact</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3" v-if="mount">
      <template
      v-for="(item, index) in navigation" :key="item.name"
      >
      <DisclosureButton 
    @click="changeCurrent(index)"
    :aria-current="item.current ? 'page' : undefined"
     :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium']"
     :href="item.href" as="a">{{ item.name }}</DisclosureButton>
      
      </template>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
let mount = ref(true);
const navigation = ref([
  { name: 'Home', href: '#home', current: true },
  { name: 'Services', href: '#service', current: false },
  { name: 'Skills', href: '#skills', current: false },
  { name: 'Portfolio', href: '#portfolio', current: false },
  { name: 'Contact', href: '#contact', current: false },
]);

function changeCurrent(index) {
  navigation.value.forEach((value) => {
    if(navigation.value.indexOf(value) == index) {
      value.current = true;
      mount.value = false;
      setTimeout(()=>{mount.value = true},0)
    }
    else{
      value.current = false;
    }
  })
}


</script>