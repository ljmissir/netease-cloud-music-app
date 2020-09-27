export default [
  {
    path: "/find",
    component: () => import("@/views/find/index"),
  },
  {
    path: "/songrcmd",
    component: () => import("@/views/recommend/index"),
  },
  {
    path: "/playListDetail/:id",
    component: () => import("@/views/playListDetail/index"),
  },
  {
    path: "/songrank",
    component: () => import("@/views/songRank/index"),
  },
  {
    path: "/singer/:id",
    component: () => import("@/views/songDetail/index"),
  },
  {
    path: "/playlistCollection",
    component: () => import("@/views/discs/index"),
  },
  {
    path: "/djradio",
    component: () => import("@/views/djradio/index"),
  },
];
