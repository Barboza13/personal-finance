<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@layouts/MainLayout.vue'
import IncomeService from '@services/IncomeService'

import type { Ref } from 'vue'
import type { Income } from '@interfaces/interfaces'

const route = useRoute()
const indexParam: Ref<string | string[]> = ref('')
const incomeService = new IncomeService()
const name: Ref<string> = ref('')
const amount: Ref<number> = ref(0)

onMounted(() => checkParams())

const checkParams = (): void => {
  indexParam.value = route.params.index

  if (indexParam.value && !Array.isArray(indexParam.value)) {
    const income = incomeService.getIncomeByIndex(parseInt(indexParam.value))

    if (income) {
      name.value = income.name
      amount.value = income.amount
    } else {
      alert('¡Registro de ingreso no encontrado!')
    }
  }
}

const handleSubmit = (event: Event): void => {
  event.preventDefault()

  if (indexParam.value && !Array.isArray(indexParam.value)) {
    incomeService.updateIncome(
      { name: name.value, amount: amount.value } as Income,
      parseInt(indexParam.value),
    )
    name.value = ''
    amount.value = 0
  } else {
    incomeService.saveIncome({ name: name.value, amount: amount.value } as Income)
    name.value = ''
    amount.value = 0
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
            <h1 v-if="indexParam == ''" class="text-3xl">Registrar Ingreso</h1>
            <h1 v-else class="text-3xl">Actualizar Ingreso</h1>
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
