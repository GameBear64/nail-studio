import { createRouter, createWebHistory } from 'vue-router';

import { setUserData } from '@store/userStore';
import { userStore } from '@store/userStore';

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
    component: () => import('@pages/Artist.vue'),
    meta: { guestRoute: true },
  },
  {
    name: 'artists',
    path: '/artists',
    component: () => import('@pages/ArtistList.vue'),
    meta: { guestRoute: true },
  },
  {
    name: 'appointments',
    path: '/appointments',
    component: () => import('@pages/Appointments.vue'),
  },
  {
    name: 'book',
    path: '/book',
    // idea: options in query params to preselect option
    component: () => import('@pages/Booking.vue'),
  },
  {
    path: '/admin',
    redirect: () => '/admin/artists',
    component: () => import('@pages/AdminPanel.vue'),
    meta: { adminRoute: true },
    children: [
      { path: 'artists', name: 'admin/artists', component: () => import('@pages/Admin/ArtistsPanel.vue') },
      { path: 'procedures', name: 'admin/procedures', component: () => import('@pages/Admin/ProcedurePanel.vue') },
      // { path: 'galleries', name: 'galleries', component: () => import('@pages/Admin/GalleryPanel.vue') },
    ],
  },
  { path: '/user/:id', component: () => import('@pages/ArtistProfile.vue') },
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
  // if (userStore.id && to.meta?.guestRoute) return { path: '/' };
});

export default router;
