import Vue from "vue";
import VueRouter from "vue-router";
import authorRoutes from "./modules/index";

Vue.use(VueRouter);

const constanceRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...constanceRoutes, ...authorRoutes],
});

export default router;
