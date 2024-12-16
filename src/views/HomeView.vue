<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import MainLayout from '@layouts/MainLayout.vue'
import IncomeService from '@services/IncomeService'

import type { Ref } from 'vue'
import type { Income } from '@interfaces/interfaces'

const incomeService = new IncomeService()
const incomes: Ref<Income[]> = ref([])
let total: Ref<number> = ref(0)

onMounted(() => (incomes.value = incomeService.getIncomes()))

// The watch is needed to access the "incomes" variable after the component is mounted.
watch(incomes, (newIncomes) => {
  total.value = newIncomes.reduce((sum, income) => sum + income.amount, 0)
})
</script>

<template>
  <MainLayout>
    <template #default>
      <section class="grid grid-cols-1 lg:grid-cols-2 w-full lg:h-screen">
        <article class="flex flex-col justify-start items-center lg:w-full h-full">
          <div>
            <h1 class="text-3xl">Lista de ingresos</h1>
            <ul>
              <li class="list-disc" v-for="income in incomes">
                {{ income.name }} - {{ income.amount }}Gs.
              </li>
            </ul>
            <h1>Total: {{ total }}Gs.</h1>
          </div>
        </article>

        <article class="flex flex-col justify-start items-center lg:w-full h-full">
          <div>
            <h1 class="text-3xl">Lista de egresos</h1>
            <ul>
              <li class="list-disc"></li>
            </ul>
          </div>
        </article>
      </section>
    </template>
  </MainLayout>
</template>

<style scoped></style>
