import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import Toast from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import './index.css'

const option = {
  autoClose: 3000,
  position:'top-center'
}

createApp(App).use(router).use(Toast, option).mount('#app')
