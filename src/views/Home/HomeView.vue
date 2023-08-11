<script setup>
import HomeCarousel from "./HomeCarousel.vue";
import AuthorView from "./AuthorView.vue";
</script>

<template>
  <main>
    <HomeCarousel />
    <div class="w-full author">
      <AuthorView @scroll-to-section="$emit('scrollToSection', 'Portfolio', 3)" />
    </div>
  </main>
</template>

<style scoped>
.author {
  position: absolute;
  top: 150px;
  /* left: 20px; */
}

@media only screen and (max-width: 800px) {
  .author {
    top: 100px;
  }
}
</style>
