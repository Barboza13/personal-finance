<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ShowAsideTransition from '@transitions/ShowAsideTransition.vue'

import type { Ref } from 'vue'

interface Link {
  name: string
  href: string
}

const currentPath: string = useRoute().fullPath
const isShowAside: Ref<boolean> = ref(false)
const asideButtonIcon: Ref<string> = ref('hi-menu')
const links: Link[] = [
  {
    name: 'Inicio',
    href: '/',
  },
  {
    name: 'Ingresos',
    href: '/incomes',
  },
  {
    name: 'Egresos',
    href: '/expenses',
  },
  {
    name: 'Graficos',
    href: '/charts',
  },
]

const changeAsideVisibility = (): void => {
  isShowAside.value = !isShowAside.value
  asideButtonIcon.value = isShowAside.value ? 'io-close' : 'hi-menu'
}
</script>

<template>
  <button
    :class="[
      isShowAside ? 'translate-x-[calc(100vw*0.8)]' : 'translate-x-0',
      'absolute transition-transform duration-100 ease-linear z-[1001] md:hidden',
    ]"
    @click="changeAsideVisibility"
  >
    <v-icon :name="asideButtonIcon" fill="white" scale="2" />
  </button>
  <ShowAsideTransition>
    <aside
      v-if="isShowAside"
      class="flex flex-col justify-start items-center w-[80%] h-[100vh] absolute bg-cyan-800 z-[100]"
    >
      <section class="mt-6">
        <h1 class="text-3xl text-white">Navegacion</h1>
      </section>
      <section class="w-full px-4">
        <ul class="flex flex-col justify-center w-full h-full text-3xl text-white mt-6 gap-4">
          <li
            v-for="({ name, href }, index) in links"
            :key="index"
            class="flex justify-center items-center w-full"
          >
            <router-link
              :to="href"
              class="flex justify-center w-full"
              @click="changeAsideVisibility"
            >
              <h1
                v-if="href === currentPath"
                class="flex justify-center w-full text-3xl text-cyan-800 bg-white rounded-md"
              >
                {{ name }}
              </h1>
              <h1 v-else class="flex justify-center w-full text-3xl text-white">{{ name }}</h1>
            </router-link>
          </li>
        </ul>
      </section>
    </aside>
  </ShowAsideTransition>
</template>

<style scoped></style>
