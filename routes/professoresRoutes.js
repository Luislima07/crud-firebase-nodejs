import { Router } from "express";
import professoresController from "../controllers/professoresController.js";

const router = Router();

router.get("/", professoresController.list);
router.get("/create",  professoresController.createForm);
router.post("/create", professoresController.create);

export default router;
