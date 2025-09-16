import { Router } from "express";
import categoriaController from "../controllers/categoriaController.js";

const router = Router();

router.get("/", categoriaController.list);
router.get("/create", categoriaController.createForm);
router.post("/create", categoriaController.create);

export default router;
