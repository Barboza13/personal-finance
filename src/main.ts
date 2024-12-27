import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  FaEdit,
  MdDelete,
  HiSolidSortDescending,
  HiSolidSortAscending,
  BiGraphDown,
  BiGraphUp,
} from 'oh-vue-icons/icons'

addIcons(FaEdit, MdDelete, HiSolidSortDescending, HiSolidSortAscending, BiGraphDown, BiGraphUp)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(router)

app.mount('#app')
