<template>
  <div class="flex items-center justify-center min-h-100 bg-surface">
    <div class="text-center">
      <!-- Animated loading spinner -->
      <div class="w-12 h-12 mx-auto mb-4 border-4 border-border/20 border-t-primary-green-400 rounded-full animate-spin"></div>

      <!-- Loading text -->
      <p class="text-fg-subtle text-sm font-medium">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
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