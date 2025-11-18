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
import MessageDialog from '@components/MessageDialog.vue'
import ShowModalTransition from '@transitions/ShowModalTransition.vue'
import ShowMessageDialogTransition from '@transitions/ShowMessageDialogTransition.vue'

import type { Ref } from 'vue'
import type { Record } from '@interfaces/interfaces'

const incomeService: IncomeService = new IncomeService()
const expenseService: ExpenseService = new ExpenseService()
const incomes: Ref<Record[]> = ref([])
const expenses: Ref<Record[]> = ref([])
const isModalVisible: Ref<boolean> = ref(false)
const serviceType: Ref<string> = ref('')
const currentIndex: Ref<number> = ref(-1)
const totalIncomes: Ref<number> = ref(0)
const totalExpenses: Ref<number> = ref(0)
const balanceSheet: Ref<number> = computed(() => totalIncomes.value - totalExpenses.value)
const message: Ref<string> = ref('')
const isMessageVisible: Ref<boolean> = ref(false)

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

const handleDelete = (): void => {
  if (currentIndex.value < 0) hideDeleteModal()

  if (serviceType.value === 'income') {
    message.value = new IncomeService().deleteIncome(currentIndex.value)
    updateIncomes()
  } else {
    message.value = new ExpenseService().deleteExpense(currentIndex.value)
    updateExpenses()
  }

  hideDeleteModal()
  toggleMessageVisibility() // Show message.
  setTimeout(() => toggleMessageVisibility(), 3000) // Hide message.
}

const toggleMessageVisibility = () => (isMessageVisible.value = !isMessageVisible.value)

onMounted(() => {
  incomes.value = sortRecordsByDate(incomeService.getIncomes())
  expenses.value = sortRecordsByDate(expenseService.getExpenses())
})
</script>

<template>
  <div
    v-show="isModalVisible"
    class="absolute bg-black opacity-[60%] w-full h-screen z-[999]"
  ></div>
  <MainLayout>
    <template #default>
      <section class="flex justify-center items-center w-full h-[10%] border-b border-cyan-800">
        <h1 class="text-2xl">
          Balance general:
          <span v-if="balanceSheet >= 0" class="text-green-500">+{{ balanceSheet }}Gs.</span>
          <span v-else class="text-red-500">{{ balanceSheet }}Gs.</span>
        </h1>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-2 w-full h-[90%]">
        <article
          class="flex flex-col justify-start items-center w-full overflow-hidden border-b lg:border-b-0 lg:border-r border-cyan-800"
        >
          <div
            class="flex flex-col justify-center items-center w-full border-b border-cyan-800 p-1"
          >
            <h1 class="text-3xl text-center">Lista de ingresos</h1>
            <div class="flex justify-between items-center h-full w-full">
              <h1 class="text-xl">Total: {{ totalIncomes }}Gs.</h1>
              <div class="flex justify-center items-center gap-2 mr-2">
                <h1>Ver por:</h1>
                <FilterButton
                  icon="bi-graph-up"
                  icon-title="Highest amount"
                  @filterFunction="() => (incomes = sortRecordsByHighestAmount(incomes))"
                />
                <FilterButton
                  icon="bi-graph-down"
                  icon-title="Lowest amount"
                  @filterFunction="() => (incomes = sortRecordsByLowestAmount(incomes))"
                />
                <FilterButton
                  icon="hi-solid-sort-descending"
                  icon-title="Descending"
                  @filterFunction="() => (incomes = sortRecordsDescending(incomes))"
                />
                <FilterButton
                  icon="hi-solid-sort-ascending"
                  icon-title="Ascending"
                  @filterFunction="() => (incomes = sortRecordsAscending(incomes))"
                />
              </div>
            </div>
          </div>
          <ul class="lg:grow h-80 w-full overflow-y-auto px-2">
            <li
              class="flex justify-between items-center w-full min-h-10"
              v-for="(income, index) in incomes"
              :key="index"
            >
              {{ income.item.date }} : {{ income.item.name }} : {{ income.item.amount }}Gs.
              <div class="flex justify-center items-center gap-2">
                <EditButton :service="'income'" :index="index" />
                <button
                  class="w-8 h-8 bg-red-500 hover:bg-red-600 cursor-pointer rounded-md transition-colors duration-200 ease"
                  @click="showDeleteModal('income', index)"
                >
                  <v-icon name="md-delete" fill="white" scale="1.3" />
                </button>
              </div>
            </li>
          </ul>
        </article>

        <article class="flex flex-col justify-start items-center w-full overflow-hidden">
          <div
            class="flex flex-col justify-center items-center w-full border-b border-cyan-800 p-1"
          >
            <h1 class="text-3xl text-center">Lista de egresos</h1>
            <div class="flex justify-between items-center h-full w-full">
              <h1 class="text-xl">Total: {{ totalExpenses }}Gs.</h1>
              <div class="flex justify-center items-center gap-2 mr-2">
                <h1>Ver por:</h1>
                <FilterButton
                  icon="bi-graph-up"
                  icon-title="Highest amount"
                  @filterFunction="() => (expenses = sortRecordsByHighestAmount(expenses))"
                />
                <FilterButton
                  icon="bi-graph-down"
                  icon-title="Lowest amount"
                  @filterFunction="() => (expenses = sortRecordsByLowestAmount(expenses))"
                />
                <FilterButton
                  icon="hi-solid-sort-descending"
                  icon-title="Descending"
                  @filterFunction="() => (expenses = sortRecordsDescending(expenses))"
                />
                <FilterButton
                  icon="hi-solid-sort-ascending"
                  icon-title="Ascending"
                  @filterFunction="() => (expenses = sortRecordsAscending(expenses))"
                />
              </div>
            </div>
          </div>
          <ul class="lg:grow h-80 w-full overflow-y-auto px-2">
            <li
              class="flex justify-between items-center w-full min-h-10"
              v-for="(expense, index) in expenses"
              :key="index"
            >
              {{ expense.item.date }} : {{ expense.item.name }} : {{ expense.item.amount }}Gs.
              <div class="flex justify-center items-center gap-2">
                <EditButton service="'expense'" :index="index" />
                <button
                  class="w-8 h-8 bg-red-500 hover:bg-red-600 cursor-pointer rounded-md transition-colors duration-200 ease"
                  @click="showDeleteModal('expense', index)"
                >
                  <v-icon name="md-delete" fill="white" scale="1.3" />
                </button>
              </div>
            </li>
          </ul>
        </article>
      </section>

      <ShowModalTransition>
        <DeleteModal
          v-if="isModalVisible"
          @hideDeleteModal="hideDeleteModal"
          @handleDelete="handleDelete"
        />
      </ShowModalTransition>

      <ShowMessageDialogTransition>
        <MessageDialog v-show="isMessageVisible" :message="message" />
      </ShowMessageDialogTransition>
    </template>
  </MainLayout>
</template>

<style scoped></style>
