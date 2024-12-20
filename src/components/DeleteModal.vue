<script lang="ts" setup>
import ExpenseService from '@services/ExpenseService'
import IncomeService from '@services/IncomeService'
import ShowModalTransition from '@transitions/ShowModalTransition.vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
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
  <ShowModalTransition>
    <div
      v-if="props.isVisible"
      class="flex flex-col justify-around items-center w-[40%] h-44 absolute top-32 left-[405px] bg-cyan-800 opacity-100 rounded-md z-[1000]"
    >
      <h1 class="text-2xl text-white">¿Seguro que desea eliminar el registro?</h1>
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
  </ShowModalTransition>
</template>

<style scoped></style>
