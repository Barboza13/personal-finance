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
  HiMenu,
  IoClose,
} from 'oh-vue-icons/icons'

addIcons(
  FaEdit,
  MdDelete,
  HiSolidSortDescending,
  HiSolidSortAscending,
  BiGraphDown,
  BiGraphUp,
  HiMenu,
  IoClose,
)

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(router)

app.mount('#app')
