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
  top: 200px;
  /* left: 20px; */
}
</style>
