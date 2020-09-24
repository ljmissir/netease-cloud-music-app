const files = require.context(".", false, /\.js$/);

let routes = [];

files.keys().forEach((key) => {
  if (key === "./index.js") return;
  routes = [...routes, ...files(key).default];
});

export default routes;

console.log(routes, 1111);