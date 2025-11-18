<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import type { Ref } from 'vue'
import type { Link } from '@interfaces/interfaces.ts'

const links: Ref<Link[]> = ref([
  { link: '/', text: 'Inicio' },
  { link: '/incomes', text: 'Ingresos' },
  { link: '/expenses', text: 'Egresos' },
  { link: '/charts', text: 'Gráficos' },
])
</script>

<template>
  <nav class="flex justify-around items-center w-full h-full bg-cyan-800 md:gap-20">
    <section class="flex justify-center md:justify-normal w-full md:w-0">
      <RouterLink class="flex justify-center items-center gap-2" to="/">
        <img class="w-[36px] h-[36px]" src="/public/favicon.svg" alt="Money icon" />
        <h1 class="text-3xl text-white">PersonalFinance</h1>
      </RouterLink>
    </section>
    <section>
      <ul class="hidden md:flex justify-center items-center md:gap-5 lg:gap-10">
        <li v-for="({ link, text }, index) in links" :key="index">
          <RouterLink
            :to="link"
            class="relative text-2xl text-white transition-colors after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-500 hover:after:w-full"
            active-class="after:w-full after:bg-white"
          >
            {{ text }}
          </RouterLink>
        </li>
      </ul>
    </section>
  </nav>
</template>

<style scoped></style>
