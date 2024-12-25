<script lang="ts" setup>
import { ref, onMounted, computed, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@layouts/MainLayout.vue'
import ExpenseService from '@services/ExpenseService'

import type { Ref } from 'vue'
import type { Expense } from '@interfaces/interfaces'

const route = useRoute()
const indexParam = computed(() => route.params.index)
const expenseService = new ExpenseService()
const name: Ref<string> = ref('')
const amount: Ref<number> = ref(0)
const date: Ref<string> = ref('')

onMounted(() => checkParams())
onUpdated(() => checkParams())

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
    expenseService.updateExpense(
      { name: name.value, amount: amount.value, date: date.value } as Expense,
      parseInt(indexParam.value),
    )
    name.value = ''
    amount.value = 0
    date.value = ''
  } else {
    expenseService.saveExpense({
      name: name.value,
      amount: amount.value,
      date: date.value,
    } as Expense)
    name.value = ''
    amount.value = 0
    date.value = ''
  }
}
</script>

<template>
  <MainLayout>
    <template #default>
      <section class="flex justify-center items-center w-full lg:h-full">
        <form
          class="flex flex-col justify-between items-center w-[50%] h-[500px] text-white bg-cyan-800 rounded-md py-4"
          @submit="handleSubmit"
        >
          <div>
            <h1 v-if="indexParam == ''" class="text-3xl">Registrar Egreso</h1>
            <h1 v-else class="text-3xl">Actualizar Egreso</h1>
          </div>

          <div class="flex flex-col justify-center items-center w-[50%] gap-4">
            <div class="flex flex-col w-full">
              <label for="name">Nombre</label>
              <input
                class="rounded-md text-black h-8 px-2"
                type="text"
                id="name"
                name="name"
                v-model="name"
              />
            </div>
            <div class="flex flex-col w-full">
              <label for="amount">Monto (Gs.)</label>
              <input
                class="rounded-md text-black h-8 px-2"
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
                class="rounded-md text-black h-8 px-2"
                type="date"
                id="date"
                name="date"
                v-model="date"
              />
            </div>
          </div>

          <div class="flex justify-center items-center w-full">
            <button
              v-if="indexParam == ''"
              class="w-52 h-10 text-xl bg-green-500 rounded-md"
              type="submit"
            >
              Guardar
            </button>
            <button v-else class="w-52 h-10 text-xl bg-green-500 rounded-md" type="submit">
              Actualizar
            </button>
          </div>
        </form>
      </section>
    </template>
  </MainLayout>
</template>

<style scoped></style>
