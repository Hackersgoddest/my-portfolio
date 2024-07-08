<template>
  <section class="bg-[#101014]">
    <Header :title="title" :description="description" id="Services" />
    <ServiceContent />
  </section>
</template>

<script setup>
import ServiceContent from "./ServiceContent.vue";
import Header from "../../components/Header.vue";
import { shallowRef } from "vue";

const title = shallowRef('SERVICES')
const description = shallowRef('What i Offer')
</script>

<style scoped>
</style>
