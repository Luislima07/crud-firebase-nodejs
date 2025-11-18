import { Router } from "express";
import professoresController from "../controllers/professoresController.js";

const router = Router();

router.get("/", professoresController.list);
router.get("/create",  professoresController.createForm);
router.post("/create", professoresController.create);
router.get("/:id/edit", professoresController.editForm);
router.post("/:id/edit", professoresController.update);
router.get("/:id/delete", professoresController.delete);

export default router;
