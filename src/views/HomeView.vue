<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import MainLayout from '@layouts/MainLayout.vue'
import IncomeService from '@services/IncomeService'
import ExpenseService from '@services/ExpenseService'
import EditButton from '@components/EditButton.vue'
import DeleteModal from '@components/DeleteModal.vue'
import FilterButton from '@components/FilterButton.vue'
import {
  sortRecordsByDate,
  sortRecordsByHighestAmount,
  sortRecordsByLowestAmount,
  sortRecordsDescending,
  sortRecordsAscending,
} from '@utils/utils'

import type { Ref } from 'vue'
import type { Record } from '@interfaces/interfaces'

const incomeService: IncomeService = new IncomeService()
const expenseService: ExpenseService = new ExpenseService()
const incomes: Ref<Record[]> = ref([])
const expenses: Ref<Record[]> = ref([])
const isModalVisible: Ref<boolean> = ref(false)
const serviceType: Ref<string> = ref('')
const currentIndex: Ref<number | null> = ref(null)
const totalIncomes: Ref<number> = ref(0)
const totalExpenses: Ref<number> = ref(0)
const balanceSheet: Ref<number> = computed(() => totalIncomes.value - totalExpenses.value)

onMounted(() => {
  incomes.value = sortRecordsByDate(incomeService.getIncomes())
  expenses.value = sortRecordsByDate(expenseService.getExpenses())
})

// The watchs is needed to access the incomes and expenses variables after the component is mounted.
watch(incomes, (newIncomes) => {
  totalIncomes.value = newIncomes.reduce((sum, income) => sum + income.item.amount, 0)
})

watch(expenses, (newExpenses) => {
  totalExpenses.value = newExpenses.reduce((sum, expense) => sum + expense.item.amount, 0)
})

// A new instance of the services is needed to update the incomes and expenses.
const updateIncomes = (): void => {
  const incomeService = new IncomeService()
  incomes.value = sortRecordsByDate(incomeService.getIncomes())
}

const updateExpenses = (): void => {
  const expenseService = new ExpenseService()
  expenses.value = sortRecordsByDate(expenseService.getExpenses())
}

const showDeleteModal = (service: string, index: number | null): void => {
  if (index === null) {
    alert('¡El indice no puede ser nulo!')
    return
  }

  serviceType.value = service
  currentIndex.value = index
  isModalVisible.value = true
}
const hideDeleteModal = (): boolean => (isModalVisible.value = false)
</script>

<template>
  <MainLayout>
    <template #default>
      <section class="flex justify-center items-center w-full h-[10%] border-b-2 border-cyan-800">
        <h1 class="text-2xl">
          Balance general:
          <span v-if="balanceSheet >= 0" class="text-green-500">+{{ balanceSheet }}Gs.</span>
          <span v-else class="text-red-500">{{ balanceSheet }}Gs.</span>
        </h1>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-2 w-full h-[90%]">
        <article
          class="flex flex-col justify-start items-center lg:w-full h-full border-r-2 border-cyan-800"
        >
          <div class="flex justify-center items-center w-full h-10">
            <h1 class="text-3xl">Lista de ingresos</h1>
          </div>
          <div
            class="flex justify-between items-center w-full h-10 border-b-2 border-cyan-800 lg:pl-2"
          >
            <h1 class="text-xl">Total: {{ totalIncomes }}Gs.</h1>
            <div class="flex justify-center items-center gap-2 mr-2">
              <FilterButton
                icon="bi-graph-up"
                @filterFunction="() => (incomes = sortRecordsByHighestAmount(incomes))"
              />
              <FilterButton
                icon="bi-graph-down"
                @filterFunction="() => (incomes = sortRecordsByLowestAmount(incomes))"
              />
              <FilterButton
                icon="hi-solid-sort-descending"
                @filterFunction="() => (incomes = sortRecordsDescending(incomes))"
              />
              <FilterButton
                icon="hi-solid-sort-ascending"
                @filterFunction="() => (incomes = sortRecordsAscending(incomes))"
              />
            </div>
          </div>
          <ul class="w-full lg:px-4">
            <li
              class="flex justify-between items-center w-full h-10"
              v-for="(income, index) in incomes"
              :key="index"
            >
              {{ income.item.date }} : {{ income.item.name }} : {{ income.item.amount }}Gs.
              <div class="flex justify-center items-center gap-2">
                <EditButton :service="'income'" :index="index" />
                <button
                  class="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-md"
                  @click="showDeleteModal('income', index)"
                >
                  <v-icon name="md-delete" fill="white" scale="1.3" />
                </button>
              </div>
            </li>
          </ul>
        </article>

        <article class="flex flex-col justify-start items-center lg:w-full h-full">
          <div class="flex justify-center items-center w-full h-10">
            <h1 class="text-3xl">Lista de egresos</h1>
          </div>
          <div
            class="flex justify-between items-center w-full h-10 border-b-2 border-cyan-800 lg:pl-2"
          >
            <h1 class="text-xl">Total: {{ totalExpenses }}Gs.</h1>
            <div class="flex justify-center items-center gap-2 mr-2">
              <FilterButton
                icon="bi-graph-up"
                @filterFunction="() => (expenses = sortRecordsByHighestAmount(expenses))"
              />
              <FilterButton
                icon="bi-graph-down"
                @filterFunction="() => (expenses = sortRecordsByLowestAmount(expenses))"
              />
              <FilterButton
                icon="hi-solid-sort-descending"
                @filterFunction="() => (expenses = sortRecordsDescending(expenses))"
              />
              <FilterButton
                icon="hi-solid-sort-ascending"
                @filterFunction="() => (expenses = sortRecordsAscending(expenses))"
              />
            </div>
          </div>
          <ul class="w-full lg:px-4">
            <li
              class="flex justify-between items-center w-full h-10"
              v-for="(expense, index) in expenses"
              :key="index"
            >
              {{ expense.item.date }} : {{ expense.item.name }} : {{ expense.item.amount }}Gs.
              <div class="flex justify-center items-center gap-2">
                <EditButton service="'expense'" :index="index" />
                <button
                  class="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-md"
                  @click="showDeleteModal('expense', index)"
                >
                  <v-icon name="md-delete" fill="white" scale="1.3" />
                </button>
              </div>
            </li>
          </ul>
        </article>
      </section>
    </template>
  </MainLayout>
  <DeleteModal
    :isVisible="isModalVisible"
    :service="serviceType"
    :index="currentIndex ?? -1"
    @updateIncomes="updateIncomes"
    @updateExpenses="updateExpenses"
    @hideDeleteModal="hideDeleteModal"
  />
</template>

<style scoped></style>
