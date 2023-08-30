const Router = require("koa-router");
const router = new Router();
const _v = require("./v");
const { pyNodeManager } = require("./pynode");

const validApiKey = require("./appwrite");

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

router.all("/app/api/:uuid/:key/:file", async (ctx, next) => {
  try {
    _v(`{r} -> api -> [RUN] @ uuid ${ctx.params.uuid} @ file ${ctx.params.file}`);
    if (!ctx.params.uuid) ctx.throw(500, "Missing UUID");
    if (!ctx.params.key) ctx.throw(500, "Missing Key");
    if (!ctx.params.file) ctx.throw(500, "Missing File Query");

    const _uuid = ctx.params.uuid;
    const _key = ctx.params.key;
    const _file = ctx.params.file.toLowerCase().replace(/[^a-z]/g, "");

    //?   Query JSON String
    let _query = "";
    //?   Final JSON String
    let _json = "";

    //TODO Redis Cache for _uuid, _key, so that it does not have to call the Appwrite Database.

    const _valid = await validApiKey(_uuid, _key);

    if (_valid === "kbve") {
      ctx.throw(500, "UUID / KEY / FILE Invalid");
    }

    if(ctx.request.body.data) {
      _query = ctx.request.body.data;
      _v(`{r} -> api -> data ${JSON.stringify(_query)}`);
    }
    else if(ctx.query.json)
    {
      try {
        //_json = JSON.stringify((ctx.query.json).replace(/[^a-zA-Z0-9 -]/g, ''));
        _query = JSON.parse(ctx.query.json);
        _v(`{r} -> api -> data [QUERY] -> ${ctx.query.json}`);
      } catch (error) {
        ctx.throw(500, "JSON Formatting Error");
      }
    }

    // if (ctx.request.body) {
    //   try {
    //     //_json = JSON.stringify((ctx.query.json).replace(/[^a-zA-Z0-9 -]/g, ''));
    //     _query = JSON.parse(ctx.request.body);
    //   } catch (error) {
    //     ctx.throw(500, "JSON Formatting Error");
    //   }
    // }

    if (_query) {
      _json = {
        ..._valid,
        ..._query,
      };
    } else {
      _v('{r} -> api -> data was not found!');
      _json = _valid;
    }

    const __pyN = await pyNodeManager(
      _file,
      JSON.stringify(_json).substring(0, 2500)
    );

    let _pyN = await __pyN._process();
    if (_pyN) {
      ctx.body = _pyN;
    } else {
      ctx.throw(500, "Issue with PyNode");
    }
  } catch (error) {
    _v(error);
    ctx.body = {
      status: 500,
      message: error,
    };
  }
});

router.all("/app/api/blueprint/:token", async (ctx, next) => {
  try {
    _v(`{r} -> blueprint -> token ${ctx.params.token}`);
  } catch (error) {
    _v(error);
    ctx.body = {
      status: 500,
      message: error,
    };
  }
});

router.get("/docs", (ctx, next) => {
  ctx.status = 301;
  ctx.redirect("https://kbve.com/project/");
});

router.get("/login", async (ctx, next) => {});

module.exports = router;
