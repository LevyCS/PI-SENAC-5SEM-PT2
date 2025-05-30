import { Router } from "express";
import {
  createConsultation,
  updateConsultation,
  deleteConsultation,
  getOneConsultation,
  getAllConsultation,
} from "../controllers/consultation.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.use(authenticate);

router.get("/", getAllConsultation);
router.get("/:id", getOneConsultation);
router.post("/",  upload.array('files', 10), createConsultation);
router.put("/:id", updateConsultation);
router.delete("/:id", deleteConsultation);

export default router;
