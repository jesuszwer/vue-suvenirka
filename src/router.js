import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
      { path: '/', component: () => import('./components/views/HomeView.vue') },
      { path: '/about', component: () => import('./components/views/other/AboutView.vue') },


      { path: '/catalog', component: () => import('./components/views/catalog/CatalogList.vue') },
      { path: '/catalog/:category', component: () => import('./components/views/catalog/CatalogView.vue') },
      { path: '/product/:id', component: () => import('./components/views/product/ProductView.vue') },

      { path: '/admin', component: () => import('./components/views/admin/IndexView.vue') },

      { path: '/:pathMatch(.*)*', component: () => import('./components/views/NotFound.vue') }
  ]
})

router.beforeEach((to, from, next) => {
  // Прокрутка страницы вверх при каждом переходе
  window.scrollTo(0, 0);
  next();
});


export default router