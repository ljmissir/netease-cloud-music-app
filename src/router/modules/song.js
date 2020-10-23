export default [
  {
    path: "/song",
    component: () => import("@/views/song/index")
  },
  {
    path: "/songDetail",
    component: () => import("@/views/songDetail/index")
  }
];
