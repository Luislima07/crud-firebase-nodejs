import { Router } from "express";
import cursosController from "../controllers/cursosController.js";

const router = Router();

router.get("/", cursosController.list);
router.get("/create", cursosController.createForm);
router.post("/create", cursosController.create);

export default router;
