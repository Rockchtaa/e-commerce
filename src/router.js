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
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: () => import('./views/ProductDetails.vue'),
  },
  {
    path: '/view-cart',
    name: 'view-cart',
    component: () => import('./views/ViewCart.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
