<script lang="ts" setup>
import { onMounted } from 'vue'
import Chart from 'chart.js/auto'
import MainLayout from '@layouts/MainLayout.vue'

const showChart = (): void => {
  const myChart = document.getElementById('myChart') as HTMLCanvasElement | null

  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ]

  if (myChart) {
    new Chart(myChart, {
      type: 'bar',
      data: {
        labels: data.map((row) => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map((row) => row.count),
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
      <section class="flex justify-center items-center w-full h-[20%]">
        <h1>Vista de graficos</h1>
      </section>
      <section class="flex justify-center items-center w-full h-[80%]">
        <canvas id="myChart"></canvas>
      </section>
    </template>
  </MainLayout>
</template>

<style scoped></style>
