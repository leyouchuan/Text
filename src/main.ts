import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import chater from './components/chatBox.vue'

const app = createApp(App)
app.component('chater-box', chater)
app.mount('#app')
