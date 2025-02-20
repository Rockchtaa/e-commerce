import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/MyHome.vue'),
  },
  {
    path: '/products/:category',
    name: 'Product_category',
    component: () => import('./views/ProductCategory.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
