import express from "express"
import { envs } from "./config/envs.plugin";
import { MongoDatabase } from "./data/init";

const app = express();

app.use(express.json);

(async () => {
  await MongoDatabase.connect({
    dbName: "MonoMapAPI",
    mongoURL: envs.MONGO_URL ?? "",
  });
})();

app.listen(envs.PORT, ()=> {
  console.log(`app listening on port ${envs.PORT}`)
})