import { Router } from "express";
import { queueEmailNotification } from "../../controllers/notification.controller";

const router = Router();

router.post("/email", queueEmailNotification);

export default router;