<script lang="ts" setup></script>

<template>
  <nav class="flex justify-around items-center h-16 bg-cyan-800">
    <section>
      <router-link to="/">
        <h1 class="text-3xl text-white">PersonalFinance</h1>
      </router-link>
    </section>
    <section>
      <ul class="flex justify-center items-center gap-2">
        <li>
          <router-link to="/">
            <h1 class="text-xl text-white">Inicio</h1>
          </router-link>
        </li>
        <li>
          <router-link to="/incomes">
            <h1 class="text-xl text-white">Ingresos</h1>
          </router-link>
        </li>
      </ul>
    </section>
  </nav>
</template>

<style scoped></style>
