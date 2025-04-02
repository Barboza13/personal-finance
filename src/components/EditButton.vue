<script lang="ts" setup>
import { useRouter } from 'vue-router'

import type { Router } from 'vue-router'

const props = defineProps({
  service: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

const router: Router = useRouter()

const handleEdit = (): void => {
  if (props.service == 'income') {
    router.push({ name: 'incomes', params: { index: props.index } })
  } else {
    router.push({ name: 'expenses', params: { index: props.index } })
  }
}
</script>

<template>
  <button
    class="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-200 ease"
    @click="handleEdit"
  >
    <v-icon name="fa-edit" fill="white" scale="1.3" />
  </button>
</template>

<style scoped></style>
