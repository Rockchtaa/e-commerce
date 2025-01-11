import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/MyHome.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
