<template>
  <transition
    enter-active-class="transform transition duration-200 ease-out"
    enter-from-class="-translate-y-20 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transform transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-20 opacity-0"
  >
    <slot />
  </transition>
</template>
