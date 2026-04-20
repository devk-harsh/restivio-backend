import { Request, Response } from "express";
import logger from "../config/logger.config";
import { addEmailToQueue } from "../producers/email.producer";
import { EmailJobPayload } from "../types/email.types";

export async function queueEmailNotification(req: Request, res: Response) {
  const { to, subject, templateId, params } = req.body as EmailJobPayload;

  if (!to || !subject || !templateId) {
    return res.status(400).json({
      success: false,
      message: "to, subject and templateId are required",
    });
  }

  const job = await addEmailToQueue({
    to,
    subject,
    templateId,
    params: params || {},
  });

  logger.info("Email job added to queue", {
    jobId: job.id,
    jobName: job.name,
    to,
    templateId,
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