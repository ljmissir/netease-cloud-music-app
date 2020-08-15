export default [
  {
    path: "/songList",
    component: () => import("@/views/songList/index.vue"),
  },
  {
    path: "/songDetail",
    component: () => import("@/views/songDetail/index.vue"),
  },
];
