import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./css/style.css"

import '@fortawesome/fontawesome-free/css/all.min.css'

createApp(App).use(router).use(store).mount('#app')