import { Router } from "express";
import integrantesController from "../controllers/integrantesController.js";

const router = Router();  

router.get("/", integrantesController.show);

export default router;
