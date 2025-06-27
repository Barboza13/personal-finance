<template>
  <transition
    enter-active-class="transform transition-all duration-300 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="-translate-x-0 opacity-100"
    leave-active-class="transform transition-all duration-300 ease-in"
    leave-from-class="-translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <slot />
  </transition>
</template>
