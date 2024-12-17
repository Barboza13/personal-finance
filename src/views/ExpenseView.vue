<script lang="ts" setup>
import { ref } from 'vue'
import MainLayout from '@layouts/MainLayout.vue'
import ExpenseService from '@services/ExpenseService'

import type { Ref } from 'vue'
import type { Expense } from '@interfaces/interfaces'

const expenseService = new ExpenseService()
const name: Ref<string> = ref('')
const amount: Ref<number> = ref(0)

const handleSubmit = (event: Event): void => {
  event.preventDefault()

  expenseService.saveExpense({ name: name.value, amount: amount.value } as Expense)

  name.value = ''
  amount.value = 0
}
</script>

<template>
  <MainLayout>
    <template #default>
      <section class="flex justify-center items-center w-full lg:h-screen">
        <form
          class="flex flex-col justify-between items-center w-[50%] h-[500px] text-white bg-cyan-800 rounded-md py-4"
          @submit="handleSubmit"
        >
          <div>
            <h1 class="text-3xl">Registrar Egreso</h1>
          </div>

          <div class="flex flex-col justify-center items-center gap-4">
            <div class="flex flex-col">
              <label for="name">Nombre</label>
              <input
                class="rounded-md text-black"
                type="text"
                id="name"
                name="name"
                v-model="name"
              />
            </div>
            <div class="flex flex-col">
              <label for="amount">Monto</label>
              <input
                class="rounded-md text-black"
                type="number"
                min="0"
                id="amount"
                name="amount"
                v-model="amount"
              />
            </div>
          </div>

          <div class="flex justify-center items-center w-full">
            <button class="w-52 h-10 text-xl bg-green-500 rounded-md" type="submit">Guardar</button>
          </div>
        </form>
      </section>
    </template>
  </MainLayout>
</template>

<style scoped></style>
