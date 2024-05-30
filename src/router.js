import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', meta: { title: 'Главная' }, component: () => import('./components/views/HomeView.vue') },
    { path: '/about', meta: { title: 'О нас' }, component: () => import('./components/views/other/AboutView.vue') },


    { path: '/catalog', meta: { title: 'Каталог' }, component: () => import('./components/views/catalog/CatalogList.vue') },
    { path: '/catalog/:category', meta: { title: 'Каталог' }, component: () => import('./components/views/catalog/CatalogView.vue') },
    { path: '/product/:id', meta: { title: 'Товар' }, component: () => import('./components/views/product/ProductView.vue') },
    { path: '/product/:id/delete', meta: { title: 'Товар' }, component: () => import('./components/views/admin/deleteView.vue') },

    { path: '/cart', meta: { title: 'Корзина' }, component: () => import('./components/views/other/CartView.vue') },

    { path: '/admin/login', meta: { title: 'Личный кабинет' }, component: () => import('./components/views/admin/LoginView.vue') },
    { path: '/admin', meta: { title: 'Панель администратора' }, component: () => import('./components/views/admin/IndexView.vue') },

    { path: '/test', meta: { title: 'Тест' }, component: () => import('./components/views/TestView.vue') },
    { path: '/:pathMatch(.*)*', meta: { title: 'Страница не найдена' }, component: () => import('./components/views/NotFound.vue') }
  ]
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else {
    document.title = 'Default Title'; // Заголовок по умолчанию
  }
  window.scrollTo(0, 0);
  next();
});


export default router