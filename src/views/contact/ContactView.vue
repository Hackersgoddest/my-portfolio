<template>
  <section class="bg-[#101014]">
    <Header :title="title" :description="description" id="Contact" />
    <ContactContent />
  </section>
</template>
<script setup>
import ContactContent from "./ContactContent.vue";
import Header from "../../components/Header.vue";
import { shallowRef } from "vue";

const title = shallowRef("CONTACT");
const description = shallowRef("Check Me Out");
</script>

<style scoped></style>
