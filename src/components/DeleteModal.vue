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
    class="flex flex-col justify-around items-center w-[80%] md:w-[40%] h-32 md:h-44 top-32 absolute left-[45px] md:left-[405px] bg-cyan-800 opacity-100 rounded-md z-[1000]"
  >
    <h1 class="text-xl md:text-2xl text-white">¿Seguro que desea eliminar el registro?</h1>
    <div class="flex gap-4">
      <button
        class="w-28 h-8 text-white bg-gray-500 hover:bg-gray-600 rounded-lg"
        @click="emit('hideDeleteModal')"
      >
        Cancelar
      </button>
      <button
        class="w-28 h-8 text-white bg-red-500 hover:bg-red-600 rounded-lg"
        @click="handleDelete(props.index)"
      >
        Eliminar
      </button>
    </div>
  </div>
</template>

<style scoped></style>
