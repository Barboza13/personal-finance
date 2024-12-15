<script lang="ts" setup>
import NavBar from '@components/NavBar.vue'
</script>

<template>
  <header>
    <slot name="header">
      <NavBar />
    </slot>
  </header>
  <main>
    <slot></slot>
  </main>
</template>

<style scoped></style>
