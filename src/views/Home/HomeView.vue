<script setup>
import HomeCarousel from "./HomeCarousel.vue";
import AuthorView from "./AuthorView.vue";
</script>

<template>
  <section>
    <HomeCarousel />
    <div class="absolute top-24 md:top-36 z-20 w-full">
      <AuthorView @scroll-to-section="$emit('scrollToSection', 'Portfolio', 3)" />
    </div>
  </section>
</template>

<style scoped>
</style>
