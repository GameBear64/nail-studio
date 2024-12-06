import { createRouter, createWebHistory } from "vue-router";
import { userId } from "./toolbox/stores/userStore";

const routes = [
  {
    path: "/login",
    component: () => import("@pages/Login.vue"),
    meta: { guestRoute: true },
  },
  {
    path: "/register",
    component: () => import("@pages/Register.vue"),
    meta: { guestRoute: true },
  },
  {
    path: "/",
    component: () => import("./components/Header.vue"),
    children: [
      {
        path: "/",
        component: () => import("./pages/Home.vue"),
      },
      {
        path: "/profile",
        component: () => import("./pages/NotFound.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "text-red-700",
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.meta?.guestRoute && userId.id) {
//     return next("/");
//   }

//   if (!to.meta?.guestRoute && !userId.id) {
//     return next("/login");
//   }

//   next();
// });

export default router;
