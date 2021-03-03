import { createApp } from 'vue';
import App from './App.vue';
import 'todomvc-app-css/index.css';
import { createWebHistory, createRouter } from 'vue-router';
import Home from './Views/Home/index.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/lightswitch', component: () => import('./Views/LightSwitch/index.vue') },
    { path: '/webshop', component: () => import('./Views/WebShop/index.vue') },
    { path: '/todo', component: () => import('./Views/Todo/index.vue') }
  ]
});

const app = createApp(App);
app.use(router);
app.mount('#app');
