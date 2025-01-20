<script lang="ts" setup></script>

<template>
  <nav class="flex justify-around items-center w-full h-full bg-cyan-800">
    <section class="flex justify-center md:justify-normal w-full md:w-0">
      <router-link to="/">
        <h1 class="text-3xl text-white">PersonalFinance</h1>
      </router-link>
    </section>
    <section>
      <ul class="hidden md:flex justify-center items-center md:gap-2">
        <li>
          <router-link to="/">
            <h1 class="text-md md:text-xl text-white">Inicio</h1>
          </router-link>
        </li>
        <li>
          <router-link to="/incomes">
            <h1 class="text-md md:text-xl text-white">Ingresos</h1>
          </router-link>
        </li>
        <li>
          <router-link to="/expenses">
            <h1 class="text-md md:text-xl text-white">Egresos</h1>
          </router-link>
        </li>
        <li>
          <router-link to="/charts">
            <h1 class="text-md md:text-xl text-white">Graficos</h1>
          </router-link>
        </li>
      </ul>
    </section>
  </nav>
</template>

<style scoped></style>
