export default [
  {
    path: "/user",
    component: () => import("@/views/user/index")
  },
  {
    path: "/account",
    component: () => import("@/views/account/index")
  }
];
