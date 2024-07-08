<template>
  <section class="bg-[#101014]">
    <Header
      :title="title"
      :description="description"
      id="Skills"
    />
    <SkillsContent />
  </section>
</template>

<script setup>
import { shallowRef } from "vue";
import SkillsContent from "./SkillsContent.vue";
import Header from "../../components/Header.vue";

const title = shallowRef("SKILLS");
const description = shallowRef("The Stack I Work With");
</script>

<style scoped>
</style>
