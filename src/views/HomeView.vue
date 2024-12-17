<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import MainLayout from '@layouts/MainLayout.vue'
import IncomeService from '@services/IncomeService'
import ExpenseService from '@services/ExpenseService'
import DeleteButton from '@components/DeleteButton.vue'

import type { Ref } from 'vue'
import type { Expense, Income } from '@interfaces/interfaces'

const incomeService = new IncomeService()
const expenseService = new ExpenseService()
const incomes: Ref<Income[]> = ref([])
const expenses: Ref<Expense[]> = ref([])
let totalIncomes: Ref<number> = ref(0)
let totalExpenses: Ref<number> = ref(0)
let balanceSheet: Ref<number> = ref(0)

onMounted(() => {
  incomes.value = incomeService.getIncomes()
  expenses.value = expenseService.getExpenses()
})

// The watchs is needed to access the incomes and expenses variables after the component is mounted.
watch(incomes, (newIncomes) => {
  totalIncomes.value = newIncomes.reduce((sum, income) => sum + income.amount, 0)
})

watch(expenses, (newExpenses) => {
  totalExpenses.value = newExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  balanceSheet.value = totalIncomes.value - totalExpenses.value
})

const updateExpenses = (): void => {
  expenses.value = expenseService.getExpenses()
}

const updateIncomes = (): void => {
  incomes.value = incomeService.getIncomes()
}
</script>

<template>
  <MainLayout>
    <template #default>
      <section class="flex justify-center items-center w-full h-14 border-b-2 border-cyan-800">
        <h1 class="text-2xl">
          Balance general:
          <span v-if="balanceSheet >= 0" class="text-green-500">{{ balanceSheet }}Gs.</span>
          <span v-else class="text-red-500">{{ balanceSheet }}Gs.</span>
        </h1>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-2 w-full lg:h-screen">
        <article class="flex flex-col justify-start items-center lg:w-full h-full">
          <h1 class="text-3xl">Lista de ingresos</h1>
          <ul>
            <li class="list-disc" v-for="(income, index) in incomes" :key="index">
              {{ income.name }} : {{ income.amount }}Gs.
              <DeleteButton :service="'income'" @updateData="updateIncomes" :index="index" />
            </li>
          </ul>
          <h1>Total: {{ totalIncomes }}Gs.</h1>
        </article>

        <article class="flex flex-col justify-start items-center lg:w-full h-full">
          <h1 class="text-3xl">Lista de egresos</h1>
          <ul>
            <li class="list-disc" v-for="(expense, index) in expenses" :key="index">
              {{ expense.name }} : {{ expense.amount }}Gs.
              <DeleteButton :service="'expense'" @updateData="updateExpenses" :index="index" />
            </li>
          </ul>
          <h1>Total: {{ totalExpenses }}Gs.</h1>
        </article>
      </section>
    </template>
  </MainLayout>
</template>

<style scoped></style>
