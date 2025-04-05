import { createRouter, createWebHistory } from 'vue-router';

import { setUserData } from '@store/userStore';
import { userStore } from '@store/userStore';

import { UserRoles } from './toolbox/consts';

const routes = [
  {
    path: '/',
    component: () => import('@pages/Home.vue'),
  },
  {
    path: '/book',
    component: () => import('@pages/Booking.vue'),
  },
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
    path: '/admin',
    redirect: () => '/admin/artists',
    component: () => import('@pages/AdminPanel.vue'),
    meta: { adminRoute: true },
    children: [
      { path: 'artists', name: 'artists', component: () => import('@pages/Admin/ArtistsPanel.vue') },
      { path: 'procedures', name: 'procedures', component: () => import('@pages/Admin/ProcedurePanel.vue') },
      { path: 'galleries', name: 'galleries', component: () => import('@pages/Admin/GalleryPanel.vue') },
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
  if (userStore.id && to.meta?.adminRoute && userStore.role !== UserRoles.ADMIN) return { path: '/' };
  if (userStore.id && to.meta?.guestRoute) return { path: '/' };
});

export default router;
