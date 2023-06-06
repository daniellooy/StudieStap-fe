/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import axios from 'axios'
import {createPinia} from "pinia";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

const pinia = createPinia()
const app = createApp(App)

registerPlugins(app)

app.mount('#app')
app.use(axios)


