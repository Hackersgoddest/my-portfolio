<script setup>
import { ref, onMounted } from 'vue';
import HomeCarousel from './HomeCarousel.vue';
import AuthorView from './AuthorView.vue';

const isMounted = ref(false);
onMounted(() => isMounted.value = !isMounted.value);

</script>

<template>
  <HomeCarousel />
  <AuthorView :class="isMounted? 'author': ''" />
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
