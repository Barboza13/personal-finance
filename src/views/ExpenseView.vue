<script lang="ts" setup>
import { ref, onMounted, computed, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@layouts/MainLayout.vue'
import ExpenseService from '@services/ExpenseService'
import MessageDialog from '@components/MessageDialog.vue'
import ShowMessageDialogTransition from '@transitions/ShowMessageDialogTransition.vue'

import type { Ref } from 'vue'
import type { Expense } from '@interfaces/interfaces'

const route = useRoute()
const indexParam = computed(() => route.params.index)
const expenseService = new ExpenseService()
const name: Ref<string> = ref('')
const amount: Ref<number> = ref(0)
const date: Ref<string> = ref('')
const message: Ref<string> = ref('')
const isMessageVisible: Ref<boolean> = ref(false)

const checkParams = (): void => {
  if (indexParam.value && !Array.isArray(indexParam.value)) {
    const expense = expenseService.getExpenseByIndex(parseInt(indexParam.value))

    if (expense) {
      name.value = expense.name
      amount.value = expense.amount
      date.value = expense.date
    } else {
      alert('¡Registro de egreso no encontrado!')
    }
  } else {
    name.value = ''
    amount.value = 0
    date.value = ''
  }
}

const handleSubmit = (event: Event): void => {
  event.preventDefault()

  if (indexParam.value && !Array.isArray(indexParam.value)) {
    message.value = expenseService.updateExpense(
      { name: name.value, amount: amount.value, date: date.value } as Expense,
      parseInt(indexParam.value),
    )

    name.value = ''
    amount.value = 0
    date.value = ''
  } else {
    message.value = expenseService.saveExpense({
      name: name.value,
      amount: amount.value,
      date: date.value,
    } as Expense)

    name.value = ''
    amount.value = 0
    date.value = ''
  }

  toggleMessageVisibility() // Show message.
  setTimeout(() => toggleMessageVisibility(), 3000) // Hide message.
}

const toggleMessageVisibility = () => (isMessageVisible.value = !isMessageVisible.value)

onMounted(() => checkParams())
onUpdated(() => checkParams())
</script>

<template>
  <MainLayout>
    <template #default>
      <section class="flex justify-center items-center w-full h-full">
        <form
          class="flex flex-col justify-between items-center w-[80%] md:w-[40%] h-[400px] text-white bg-cyan-800 rounded-md py-8 shadow-xl shadow-black/45"
          @submit="handleSubmit"
        >
          <div>
            <h1 v-if="indexParam == ''" class="text-3xl">Registrar Egreso</h1>
            <h1 v-else class="text-3xl">Actualizar Egreso</h1>
          </div>

          <div class="flex flex-col justify-center items-center w-[80%] md:w-[80%] gap-4">
            <div class="flex flex-col w-full">
              <label for="name">Nombre</label>
              <input
                class="bg-white text-black rounded-md outline-none h-8 px-2"
                type="text"
                id="name"
                name="name"
                v-model="name"
              />
            </div>
            <div class="flex flex-col w-full">
              <label for="amount">Monto (Gs.)</label>
              <input
                class="bg-white text-black rounded-md outline-none h-8 px-2"
                type="number"
                min="0"
                id="amount"
                name="amount"
                v-model="amount"
              />
            </div>
            <div class="flex flex-col w-full">
              <label for="date">Fecha</label>
              <input
                class="bg-white text-black rounded-md outline-none h-8 px-2"
                type="date"
                id="date"
                name="date"
                v-model="date"
              />
            </div>
          </div>

          <div class="flex justify-center items-center w-[80%]">
            <button
              v-if="indexParam == ''"
              class="w-full h-10 text-xl bg-green-500 hover:bg-green-600 cursor-pointer rounded-md transition-colors duration-200 ease"
              type="submit"
            >
              Guardar
            </button>
            <button
              v-else
              class="w-full h-10 text-xl bg-green-500 hover:bg-green-600 cursor-pointer rounded-md transition-colors duration-200 ease"
              type="submit"
            >
              Actualizar
            </button>
          </div>
        </form>
      </section>

      <ShowMessageDialogTransition>
        <MessageDialog v-show="isMessageVisible" :message="message" />
      </ShowMessageDialogTransition>
    </template>
  </MainLayout>
</template>

<style scoped></style>
