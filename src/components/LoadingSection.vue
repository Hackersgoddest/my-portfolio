<template>
  <div class="flex items-center justify-center min-h-[400px] bg-background-primary">
    <div class="text-center">
      <!-- Animated loading spinner -->
      <div class="w-12 h-12 mx-auto mb-4 border-4 border-gray-600 border-t-primary-green-400 rounded-full animate-spin"></div>
      
      <!-- Loading text -->
      <p class="text-gray-400 text-sm font-medium">Loading...</p>
    </div>
  </div>
</template>

<script setup>
// Simple loading component for async sections
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>