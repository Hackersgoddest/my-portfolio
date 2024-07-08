<template>
  <section class="bg-[#101014]">
    <Header :title="title" :description="description" id="Portfolio" />
    <PortfolioContent />
  </section>
</template>
<script setup>
import PortfolioContent from "./PortfolioContent.vue";
import Header from "../../components/Header.vue"
import { shallowRef } from "vue";

const title = shallowRef('PORTFOLIO');
const description = shallowRef('My Latest Projects');
</script>
<style scoped>
main {
    background-color: #101014;
}
</style>
