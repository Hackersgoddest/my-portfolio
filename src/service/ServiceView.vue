<template>
    <ServiceHeader id="service" />
    <ServiceContent class="service-content" />
</template>

<script setup>
import ServiceHeader from './ServiceHeader.vue';
import ServiceContent from './ServiceContent.vue';
</script>

<style scoped>
.service-content {
    padding-bottom: 100px;
}


@media only screen and (max-width: 500px) {
  .service-content {
    padding-bottom: 50px;
  }
}


</style>