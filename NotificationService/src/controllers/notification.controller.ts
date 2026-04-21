import { Request, Response } from "express";
import logger from "../config/logger.config";
import { addEmailToQueue } from "../producers/email.producer";
import { EmailJobPayload } from "../types/email.types";

export async function queueEmailNotificationHandler(req: Request, res: Response) {
  const payload = req.body as EmailJobPayload;

  const job = await addEmailToQueue({
    ...payload,
    params: payload.params || {},
  });

  logger.info("Email job added to queue", {
    jobId: job.id,
    jobName: job.name,
    to: payload.to,
    templateId: payload.templateId,
  });

  return res.status(202).json({
    success: true,
    message: "Email job added to queue successfully",
    data: {
      jobId: job.id,
      jobName: job.name,
    },
  });
}