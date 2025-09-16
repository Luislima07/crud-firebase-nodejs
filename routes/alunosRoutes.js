import { Router } from "express";
import alunosController from "../controllers/alunosController.js";

const router = Router();

router.get("/", alunosController.list);
router.get("/create", alunosController.createForm);
router.post("/create", alunosController.create);

export default router;
