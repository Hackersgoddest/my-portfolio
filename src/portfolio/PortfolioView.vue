<template>
    <PortfolioHeader id="portfolio" />
    <PortfolioContent class="service-content" />
</template>

<script setup>
import PortfolioHeader from './PortfolioHeader.vue';
import PortfolioContent from './PortfolioContent.vue';
</script>

<style scoped>
.service-content {
    margin-bottom: 100px;
}
</style>