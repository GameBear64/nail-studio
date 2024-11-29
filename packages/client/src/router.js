import { createRouter, createWebHistory } from "vue-router";
import { userId } from "./toolbox/stores/userStore";

const routes = [
  { path: "/login", component: () => import("@pages/Login.vue") },
  { path: "/register", component: () => import("@pages/Register.vue") },
  { path: "/", component: () => import("@pages/Home.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "text-red-700",
  routes,
});

export default router;
