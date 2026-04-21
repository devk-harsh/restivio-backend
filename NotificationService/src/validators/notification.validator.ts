import { z } from "zod";

export const queueEmailNotificationSchema = z.object({
  to: z.email("Invalid recipient email address"),
  subject: z.string().trim().min(1, "Subject is required"),
  templateId: z.string().trim().min(1, "templateId is required"),
  params: z.record(z.string(), z.unknown()).optional().default({}),
});