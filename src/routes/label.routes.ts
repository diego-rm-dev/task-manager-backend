import { Router } from "express";
import { LabelController } from "../controllers/label.controller";
import { LabelService } from "../services/label.service";
import Label from "../models/label.model";

const router = Router();
const labelController = new LabelController(new LabelService(Label));

router.post("/", labelController.createLabel);
router.get("/:id", labelController.findLabelById);
router.get("/", labelController.findAllLabels);
router.put("/:id", labelController.updateLabel);
router.delete("/:id", labelController.deleteLabel);
                        
export default router;
