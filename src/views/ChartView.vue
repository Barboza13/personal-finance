<script lang="ts" setup>
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'
import MainLayout from '@layouts/MainLayout.vue'
import IncomeService from '@services/IncomeService'
import ExpenseService from '@services/ExpenseService'
import { sortRecordByDate } from '@utils/utils'

import type { Expense, Income } from '@interfaces/interfaces'

const incomeService = new IncomeService()
const expenseService = new ExpenseService()
const incomes: Income[] = incomeService.getIncomes()
const expenses: Expense[] = expenseService.getExpenses()

const sortedRecords: Income[] | Expense[] = sortRecordByDate([...incomes, ...expenses])

const alignedIncomes = Array.from(new Set([...sortedRecords.map((record) => record.date)])).map(
  (date) => {
    const record = incomes.find((income) => income.date === date)
    return record ? record.amount : 0
  },
)

const alignedExpenses = Array.from(new Set([...sortedRecords.map((record) => record.date)])).map(
  (date) => {
    const record = expenses.find((expense) => expense.date === date)
    return record ? record.amount : 0
  },
)

const showChart = (): void => {
  const myChart = document.getElementById('myChart') as HTMLCanvasElement | null

  if (myChart) {
    new Chart(myChart, {
      type: 'line',
      data: {
        labels: Array.from(new Set([...sortedRecords.map((record) => record.date)])),
        datasets: [
          // Incomes chart
          {
            label: 'Ingresos',
            data: alignedIncomes,
            borderColor: 'rgb(0, 255, 0)', // Green color
          },
          // Expenses chart
          {
            label: 'Egresos',
            data: alignedExpenses,
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
        <h1>Vista de graficos</h1>
      </section>
      <section class="flex justify-center items-start w-full h-[90%]">
        <div class="flex justify-center items-center w-[80%] h-[80%]">
          <canvas id="myChart"></canvas>
        </div>
      </section>
    </template>
  </MainLayout>
</template>

<style scoped></style>
