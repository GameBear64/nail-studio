import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("./Pages/Register.vue") },
  { path: "/register", component: () => import("./Pages/Login.vue") },
];

export const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "text-red-700",
  routes,
});