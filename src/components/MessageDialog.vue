<script lang="ts" setup>
const props = defineProps({
  message: {
    required: true,
    type: String,
  },
})
</script>

<template>
  <div
    class="fixed right-5 bottom-10 flex justify-center items-center h-14 w-96 bg-cyan-800 rounded-md shadow-xl shadow-black/45 will-change-transform z-100"
  >
    <p class="text-xl text-white">{{ props.message }}</p>
  </div>
</template>

<style scoped></style>
