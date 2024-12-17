<script lang="ts" setup>
import IncomeService from '@services/IncomeService'
import ExpenseService from '@services/ExpenseService'

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

const emit = defineEmits(['updateData'])

const handleDelete = (index: number): void => {
  if (props.service === 'income') {
    new IncomeService().deleteIncome(index)
  } else {
    new ExpenseService().deleteExpense(index)
  }

  emit('updateData')
}
</script>

<template>
  <button class="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-md" @click="handleDelete(props.index)">
    <v-icon name="md-delete" fill="white" scale="1.3" />
  </button>
</template>

<style scoped></style>
