<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['filterFunction'])
</script>

<template>
  <button
    class="w-1/4 h-full bg-gray-200 hover:bg-gray-300 rounded-sm"
    @click="emit('filterFunction')"
  >
    <v-icon :name="props.icon" fill="black" scale="1.3" />
  </button>
</template>

<style scoped></style>
