/*
{
    "openai_key": "string",
    "clarifai_pat": "string",
    "businessId": "string"
}

?   Database    ->  user
?                       ->  Collections -> user_apikey

*/

const sdk = require("node-appwrite");
const axios = require("axios");

module.exports = async (req, res) => {
  /*    Core SDK */
  const client = new sdk.Client();
  const database = new sdk.Databases(client);
  const users = new sdk.Users(client);

  let _request = "";

  /*    Helper Handler */
  const errorHandler = (__errorMessage, statusCode = 400) => {
    //TODO Error Handler Grafana.
    res.json({ data: "error", message: __errorMessage }, statusCode);
  };

  const validHandler = (_data) => {
    //TODO Valid Handler Grafana.
    res.json({ data: _data }, 200);
  };

  const eH = errorHandler;
  const vH = validHandler;

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"] ||
    !req.variables["APPWRITE_FUNCTION_PROJECT_ID"]
  ) {
    eH(
      "[Error] Environment variables are not set thus the function cannot use Appwrite SDK."
    );
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);
  }

  if (req.payload) {
    try {
      _request = JSON.parse(req.payload);
    } catch (e) {
      eH(`[Error] JSON Parsing Payload -> ${e}`);
    }
  } else {
    eH("[Error] Payload was missing");
  }

  const { openai_key, clarifai_token } = _request
  

};
