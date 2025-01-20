<template>
  <transition
    enter-active-class="transform transition duration-100 ease-out"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transform transition duration-100 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <slot />
  </transition>
</template>
