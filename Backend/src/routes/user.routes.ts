import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { getUserInfos } from "../controllers/user.controller";

const router = Router();

router.use(authenticate);

router.get("/info", getUserInfos);

export default router;
