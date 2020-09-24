export default [
  {
    path: "/find",
    component: () => import("@/views/find/index"),
  },
  {
    path: "/songrcmd",
    component: () => import("@/views/recommend/index"),
  },
];
