<template>
    <BlogHeader id="blog" />
    <BlogContent class="service-content" />
</template>

<script setup>
import BlogHeader from './BlogHeader.vue';
import BlogContent from './BlogContent.vue';
</script>

<style scoped>
.service-content {
    margin-bottom: 100px;
}
</style>