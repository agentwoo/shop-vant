import { createApp } from 'vue'
import '@/style/index.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router/index'

import 'vant/lib/index.css';
import { Icon } from 'vant';




const app = createApp(App)
const store = createPinia()
app.use(store);
app.use(router);
app.use(Icon);


app.mount('#app')