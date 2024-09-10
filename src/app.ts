import express from "express"
import { envs } from "./config/envs.plugin";

const app = express();

app.use(express.json);

app.listen(envs.PORT, ()=> {
  console.log(`app listening on port ${envs.PORT}`)
})