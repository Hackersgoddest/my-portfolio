<template>
  <main>
    <Header :title="title" :description="description" id="Services" />
    <ServiceContent class="service-content" />
  </main>
</template>

<script setup>
import ServiceContent from "./ServiceContent.vue";
import Header from "../../layouts/Header.vue";
import { shallowRef } from "vue";

const title = shallowRef('SERVICES')
const description = shallowRef('What i Offer')
</script>

<style scoped>
main {
  background-color: #101014;
}
.service-content {
  padding-bottom: 100px;
}

@media only screen and (max-width: 500px) {
  .service-content {
    padding-bottom: 50px;
  }
}
</style>
