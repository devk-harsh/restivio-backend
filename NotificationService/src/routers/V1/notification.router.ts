import { Router } from "express";
import { queueEmailNotificationHandler } from "../../controllers/notification.controller";
import { validateRequestBody } from "../../validators";
import { queueEmailNotificationSchema } from "../../validators/notification.validator";
const notificationRouter = Router();

notificationRouter.post("/email", validateRequestBody(queueEmailNotificationSchema), queueEmailNotificationHandler);
export default notificationRouter;