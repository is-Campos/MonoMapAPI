import { Router } from "express"
import { monkeyPoxCaseController } from './controller'

export class monkeyPoxRoutes {
  static get routes() : Router {
    const router = Router();

    const controller = new monkeyPoxCaseController();

    router.get("/", controller.getCases);
    router.get("/lastweek", controller.getLastWeekCases);
    router.get("/:id", controller.getCaseById)
    router.post("/", controller.createCase);
    router.put("/:id", controller.updateCase)
    router.delete("/:id", controller.deleteCaseById)

    return router
  }
}