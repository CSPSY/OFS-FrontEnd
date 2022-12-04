import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

window.router = router;
createApp(App).use(router).mount('#app');
