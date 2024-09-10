import { Router } from "express"
import { monkeyPoxRoutes } from "./controllers/monkeyPoxCases/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/api/cases", monkeyPoxRoutes.routes);
    return router;
  }
}