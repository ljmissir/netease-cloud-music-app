import { createRouter, createWebHashHistory } from "vue-router";
import authorRoutes from "./modules/index";

const constanceRoutes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constanceRoutes, ...authorRoutes]
});

export default router;
