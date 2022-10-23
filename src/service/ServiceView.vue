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
    margin-bottom: 100px;
}
</style>