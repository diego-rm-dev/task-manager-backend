import { Router } from "express";
import { CollaboratorController } from "../controllers/collaborator.controller";
import { CollaboratorService } from "../services/collaborator.service";
import Collaborator from "../models/collaborator.model";

const router = Router();
const collaboratorController = new CollaboratorController(new CollaboratorService(Collaborator));

router.post("/", collaboratorController.createCollaborator);
router.get("/:id", collaboratorController.findCollaboratorById);
router.get("/", collaboratorController.findAllCollaborators);
router.put("/:id", collaboratorController.updateCollaborator);
router.delete("/:id", collaboratorController.deleteCollaborator);
                        
export default router;
