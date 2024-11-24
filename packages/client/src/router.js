import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/login", component: () => import("@pages/Login.vue") },
  { path: "/register", component: () => import("@pages/Register.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "text-red-700",
  routes,
});

export default router;
