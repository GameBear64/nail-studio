import { createRouter, createWebHistory } from 'vue-router';

import useFetch from '@tools/useFetch';
import { setUserId } from '@store/userStore';

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
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'text-red-700',
  routes,
});

router.beforeEach(async (to) => {
  try {
    const res = await useFetch({ url: 'user', method: 'GET', noError: true });
    const userId = res?.id;
    setUserId(userId);

    if (to.meta?.guestRoute && userId) {
      return { path: '/' };
    }

    if (!to.meta?.guestRoute && !userId) {
      return { path: '/login' };
    }
  } catch (error) {
    console.log('Error during navigation guard:', error);
    return;
  }
});

export default router;
