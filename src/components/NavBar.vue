<script lang="ts" setup></script>

<template>
  <nav class="flex justify-around items-center h-16 bg-cyan-800">
    <section>
      <router-link to="/">
        <h1 class="text-3xl text-white">Title</h1>
      </router-link>
    </section>
    <section>
      <ul class="gap-2">
        <li>
          <router-link to="/">
            <h1 class="text-xl text-white">Inicio</h1>
          </router-link>
        </li>
      </ul>
    </section>
  </nav>
</template>

<style scoped></style>
