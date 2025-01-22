<script lang="ts" setup>
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'
import MainLayout from '@layouts/MainLayout.vue'
import IncomeService from '@services/IncomeService'
import ExpenseService from '@services/ExpenseService'
import { sortRecordsByDate } from '@utils/utils'

import type { Expense, Income, Record } from '@interfaces/interfaces'

const incomeService = new IncomeService()
const expenseService = new ExpenseService()
const incomes: Income[] = incomeService.getIncomes()
const expenses: Expense[] = expenseService.getExpenses()
const sortedRecords: Record[] = sortRecordsByDate(incomes, expenses)

const showChart = (): void => {
  const myChart = document.getElementById('myChart') as HTMLCanvasElement | null

  if (myChart) {
    new Chart(myChart, {
      type: 'line',
      data: {
        labels: sortedRecords.map((_, index) => index + 1),
        datasets: [
          // Incomes chart
          {
            label: 'Ingresos',
            data: incomes.map((income) => income.amount),
            borderColor: 'rgb(0, 255, 0)', // Green color
          },
          // Expenses chart
          {
            label: 'Egresos',
            data: expenses.map((expense) => expense.amount),
            borderColor: 'rgb(255, 0, 0)', // Red color
          },
        ],
      },
    })
  } else {
    console.error('¡No se encontro el elemento canvas!')
  }
}

onMounted(() => showChart())
</script>

<template>
  <MainLayout>
    <template #default>
      <section class="flex justify-center items-center w-full h-[10%]">
        <h1 class="text-3xl md:text-2xl">Vista de graficos</h1>
      </section>
      <section class="flex justify-center items-start w-full h-[90%]">
        <div class="flex justify-center items-center w-[80%] h-full lg:py-8">
          <canvas id="myChart"></canvas>
        </div>
      </section>
    </template>
  </MainLayout>
</template>

<style scoped></style>
