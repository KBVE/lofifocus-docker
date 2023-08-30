/*
{
    "title": "string",
    "description": "string",
}

?   Database    ->  lofi-focus
?                       ->  Collections -> music_generation

*/

const sdk = require("node-appwrite");
const axios = require("axios");

module.exports = async (req, res) => {
  /*    Core SDK */
  const client = new sdk.Client();
  const database = new sdk.Databases(client);
  const users = new sdk.Users(client);

  let _request = "";

  const errorHandler = (__errorMessage, statusCode = 400) => {
    res.json({ data: "error", message: __errorMessage }, statusCode);
  };

  const validHandler = (_data) => {
    res.json({ data: _data }, 200);
  };

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"] ||
    !req.variables["APPWRITE_FUNCTION_PROJECT_ID"]
  ) {
    errorHandler(
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
      errorHandler(`[Error] JSON Parsing Payload -> ${e}`);
    }
  } else {
    errorHandler("[Error] Payload was missing");
  }

  const { title, description } = _request;
};
