<template>
  <DisplaySkill :skillName="fullStackSkills" />
</template>

<script setup>
import DisplaySkill from "../../components/DisplaySkill.vue";
import skillsSvgs from "../../assets/svgs/svg";

const fullStackSkills = [...skillsSvgs.frontEnd, ...skillsSvgs.backEnd].reduce(
  (accumulator, currentValue) => {
    if (!accumulator.some((obj) => obj.name === currentValue.name)) {
      accumulator.push(currentValue);
    }
    return accumulator;
  },
  []
);
</script>

<style scoped></style>
