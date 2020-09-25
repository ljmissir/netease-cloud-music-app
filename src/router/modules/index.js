const files = require.context(".", false, /\.js$/);

let routes = [];

files.keys().forEach((key) => {
  if (key === "./index.js") return;
  routes = [...routes, ...files(key).default];
});

console.log(routes, "routes");

export default routes;
