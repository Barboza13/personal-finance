<script lang="ts" setup>
const emit = defineEmits(['hideDeleteModal', 'handleDelete'])
</script>

<template>
  <div
    class="absolute top-24 md:top-20 left-1/2 -translate-x-1/2 flex flex-col justify-around items-center w-[80%] md:w-[35%] h-32 md:h-38 bg-cyan-800 shadow-xl shadow-black/45 rounded-md z-[1000]"
  >
    <h1 class="text-md xl:text-2xl text-white">¿Seguro que deseas eliminar el registro?</h1>
    <div class="flex gap-4">
      <button
        class="w-28 h-8 text-white bg-gray-500 hover:bg-gray-600 rounded-lg transition-colors duration-200 ease"
        @click="emit('hideDeleteModal')"
      >
        Cancelar
      </button>
      <button
        class="w-28 h-8 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 ease"
        @click="emit('handleDelete')"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<style scoped></style>
