<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  iconTitle: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['filterFunction'])
</script>

<template>
  <button
    class="w-8 h-full bg-gray-200 hover:bg-gray-300 rounded-sm transition-colors duration-200 ease"
    @click="emit('filterFunction')"
  >
    <v-icon :name="props.icon" fill="black" scale="1.3" :title="props.iconTitle" />
  </button>
</template>

<style scoped></style>
