import 'dotenv/config'
import * as env from 'env-var'

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_URL_DOCKER: env.get("MONGO_URL_DOCKER").required().asString()
}