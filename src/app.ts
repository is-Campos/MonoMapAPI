import express from "express"
import { envs } from "./config/envs.plugin";
import { MongoDatabase } from "./data/init";
import { AppRoutes } from "./presentation/routes";
import { emailJob } from "./domain/jobs/email.job";

const app = express();

app.use(express.json());
app.use(AppRoutes.routes);

(async () => {
  await MongoDatabase.connect({
    dbName: "MonoMapAPI",
    mongoURL: envs.MONGO_URL_DOCKER ?? "",
  });
})();

app.listen(envs.PORT, ()=> {
  console.log(`app listening on port ${envs.PORT}`)
  emailJob();
})