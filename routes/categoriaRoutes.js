import { Router } from "express";
import categoriaController from "../controllers/categoriaController.js";

const router = Router();

router.get("/", categoriaController.list);
router.get("/create", categoriaController.createForm);
router.post("/create", categoriaController.create);
router.get("/:id/edit", categoriaController.editForm);
router.post("/:id/edit", categoriaController.update);
router.get("/:id/delete", categoriaController.delete);

export default router;
