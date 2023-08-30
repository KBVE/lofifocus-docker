//?         [Main App]
//TODO      [Migrate to Typescript]
//*         [IMPORT]
const Koa = require("koa");
const proxy = require("koa-proxies");
const path = require("path");
const parser = require("koa-bodyparser");
const httpsProxyAgent = require("https-proxy-agent");
const router = require("./router");
const serve = require("koa-static");
const _v = require("./v");
const App = new Koa();
const port = 5000;

const staticDirPath = path.join(__dirname, "public");

App
  .use(
    proxy("/api", {
      target: "https://pb.kbve.com/",
      changeOrigin: true,
      //secure: false,
      timeout: 300000,
      //rewrite: path => path.replace(/^\/kbvedatabase(\/|\/\w+)?$/, '/_'),
      logs: true,
    })
  )
  .use(
    proxy("/_", {
      target: "https://pb.kbve.com/",
      changeOrigin: true,
      //secure: false,
      timeout: 300000,
      //rewrite: path => path.replace(/^\/kbvedatabase(\/|\/\w+)?$/, '/_'),
      logs: true,
    })
  )
  .use(parser())
  .use(router.routes())
  .use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message,
      };
    }
  })
  .use(serve(staticDirPath))
  .listen(port, () => {
    _v(`Launching at http://127.0.0.1:${port}/ 🚀`);
  });
