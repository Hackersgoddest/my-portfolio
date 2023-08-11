<template>
  <main>
    <Header :title="title" :description="description" id="Contact" />
    <ContactContent />
  </main>
</template>
<script setup>
import ContactContent from "./ContactContent.vue";
import Header from "../../layouts/Header.vue";
import { shallowRef } from "vue";

const title = shallowRef("CONTACT");
const description = shallowRef("Check Me Out");
</script>

<style scoped></style>
