import { createRouter, createWebHistory } from 'vue-router';

import { setUserData, userStore } from '@store/userStore';

import { UserRoles } from './toolbox/consts';

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@pages/Home.vue'),
    meta: { guestRoute: true },
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
    name: 'artist',
    path: '/artist/:id',
    component: () => import('@pages/ArtistProfile.vue'),
    meta: { guestRoute: true },
  },
  {
    name: 'artists',
    path: '/artists',
    component: () => import('@pages/ArtistList.vue'),
    meta: { guestRoute: true },
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('@pages/Settings.vue'),
  },
  {
    name: 'appointments',
    path: '/appointments',
    component: () => import('@pages/Appointments.vue'),
  },
  {
    name: 'book',
    path: '/book',
    component: () => import('@pages/Booking.vue'),
  },
  {
    name: 'procedures',
    path: '/procedures',
    component: () => import('@pages/Procedures.vue'),
    meta: { guestRoute: true },
  },

  {
    path: '/admin',
    redirect: () => '/admin/artists',
    component: () => import('@pages/AdminPanel.vue'),
    meta: { adminRoute: true },
    children: [
      { path: 'artists', name: 'admin/artists', component: () => import('@pages/Admin/ArtistsPanel.vue') },
      { path: 'procedures', name: 'admin/procedures', component: () => import('@pages/Admin/ProcedurePanel.vue') },
      { path: 'translations', name: 'admin/translations', component: () => import('@pages/Admin/TranslationsPanel.vue') },
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
  if (userStore.id) {
    if (!to.meta?.guestRoute && !userStore.role) return { path: '/' };
    if (to.meta?.adminRoute && userStore.role !== UserRoles.ADMIN) return { path: '/' };
  }
});

export default router;
