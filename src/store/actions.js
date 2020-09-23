import * as types from "./mutation-types";
import request from "@/services";
import router from "@/router";
const Cookies = require("js-cookie");

export const setBaseParams = function({ commit }, data) {
  commit(types.SET_BASE_PARAMS, data);
};

export const setUser = async function({ commit }, data) {
  const result = await request.login(data);
  console.log(result, 123);
  Cookies.set("cookie", result.cookie);
  router.push("/find");
  commit(types.SET_USER, result);
};
