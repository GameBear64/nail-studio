import { createMemoryHistory, createRouter } from "vue-router";
import { createApp } from "vue";
import "../main.css";
import App from "./App.vue";

const routes = [
  { path: "/", component: () => import("./Pages/Register.vue") },
  { path: "/register", component: () => import("./Pages/Login.vue") },
];

const router = createRouter({
  history: createMemoryHistory(),
  linkActiveClass: "text-red-700",
  routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
