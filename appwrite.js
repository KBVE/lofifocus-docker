const {
  Client,
  Users,
  Databases,
  Permission,
  Role,
  Query,
} = require("node-appwrite");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const appwrite = new Client()
  .setEndpoint("https://ap.kbve.com/v1")
  .setProject("6436a6dc9a6b48db802f")
  .setKey(`${process.env.KBVE_API}`)
  .setSelfSigned();

const db = new Databases(appwrite);

async function validApiKey(uuid, api) {
  let valid = "kbve";

  try {
    const { documents, total } = await db.listDocuments("user", "user_apikey", [
      Query.equal("user_id", uuid),
      Query.equal("user_kbve_apikey", api),
    ]);

    if (total === 0) {
      //console.log(`${total} API Keys for ${uuid}`);
      return valid;
    } else {
      valid = documents[0];
      //console.log(valid);

      return valid;
    }
  } catch (error) {
    console.log(error);
    return valid;
  } finally {
    return valid;
  }
}

module.exports = validApiKey;
