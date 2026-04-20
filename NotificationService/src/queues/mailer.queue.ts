import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.config";
import { EmailJobPayload } from "../types/email.types";

export const MAILER_QUEUE_NAME = "mailer-queue";
export const EMAIL_JOB_NAME = "email:send"

export const mailerQueue = new Queue<EmailJobPayload>(
    MAILER_QUEUE_NAME,
    {
        connection: redisConnection,
    }
);