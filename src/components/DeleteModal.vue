<script lang="ts" setup>
import ExpenseService from '@services/ExpenseService'
import IncomeService from '@services/IncomeService'

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

const emit = defineEmits(['hideDeleteModal', 'updateIncomes', 'updateExpenses'])

const handleDelete = (index: number): void => {
  if (index < 0) emit('hideDeleteModal')

  if (props.service === 'income') {
    new IncomeService().deleteIncome(index)
    emit('updateIncomes')
  } else {
    new ExpenseService().deleteExpense(index)
    emit('updateExpenses')
  }

  emit('hideDeleteModal')
}
</script>

<template>
  <div
    class="absolute top-24 md:top-20 left-1/2 -translate-x-1/2 flex flex-col justify-around items-center w-[80%] md:w-[35%] h-32 md:h-38 bg-cyan-800 shadow-xl shadow-black/45 rounded-md z-[1000]"
  >
    <h1 class="text-lg xl:text-2xl text-white">¿Seguro que deseas eliminar el registro?</h1>
    <div class="flex gap-4">
      <button
        class="w-28 h-8 text-white bg-gray-500 hover:bg-gray-600 rounded-lg transition-colors duration-200 ease"
        @click="emit('hideDeleteModal')"
      >
        Cancelar
      </button>
      <button
        class="w-28 h-8 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 ease"
        @click="handleDelete(props.index)"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<style scoped></style>
