<script lang="ts" setup>
import NavBar from '@components/NavBar.vue'
</script>

<template>
  <header class="w-full h-[10vh]">
    <slot name="header">
      <NavBar />
    </slot>
  </header>
  <main class="w-full h-[90vh]">
    <slot />
  </main>
</template>

<style scoped></style>
