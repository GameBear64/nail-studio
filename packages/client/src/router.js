import { createRouter, createWebHistory } from 'vue-router';

import { setUserData } from '@store/userStore';
import { userStore } from '@store/userStore';

const routes = [
  {
    path: '/login',
    component: () => import('@pages/Login.vue'),
    meta: { guestRoute: true },
  },
  {
    path: '/register',
    component: () => import('@pages/Register.vue'),
    meta: { guestRoute: true },
  },
  {
    path: '/',
    component: () => import('@pages/Home.vue'),
  },
  {
    path: '/admin',
    redirect: () => '/admin/artists',
    component: () => import('@pages/AdminPanel.vue'),
    meta: { adminRoute: true },
    children: [
      { path: 'artists', name: 'artists', component: () => import('@components/ArtistsPanel.vue') },
      { path: 'galleries', name: 'galleries', component: () => import('@components/Galleries.vue') },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'text-red-700',
  routes,
});

router.beforeEach(async (to) => {
  if (!userStore.id) await setUserData();
  if (!userStore.id && !to.meta?.guestRoute) return { path: '/login' };
  if (userStore.id && to.meta?.adminRoute && userStore.role !== 'admin') return { path: '/' };
  if (userStore.id && to.meta?.guestRoute) return { path: '/' };
});

export default router;
