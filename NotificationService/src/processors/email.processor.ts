import {Job, Worker} from "bullmq";
import logger from "../config/logger.config";
import { redisConnection } from "../config/redis.config";
import { EmailJobPayload } from "../types/email.types";
import { EMAIL_JOB_NAME, MAILER_QUEUE_NAME } from "../queues/mailer.queue";

let workerInstance : Worker<EmailJobPayload> | null = null;

export function setupMailerWorker() {
    if(workerInstance) {
        return workerInstance;
    }

    workerInstance = new Worker<EmailJobPayload>(
        MAILER_QUEUE_NAME,
        async (job: Job<EmailJobPayload>) => {
            if(job.name !== EMAIL_JOB_NAME) {
                throw new Error(`Unexpected job name: ${job.name}`);
            }
            const payload = job.data;

            logger.info("Mailer worker picked a job", {
                jobId: job.id,
                jobName: job.name,
                payload,
            });
            return {
                message: "Email job consumed successfully",
                to: payload.to,
                templateId: payload.templateId,
            };
        },
        {
            connection: redisConnection,
            concurrency: 1,
        }
    );
     workerInstance.on("completed", (job, returnvalue) => {
        logger.info("Mailer job completed", {
        jobId: job.id,
        returnvalue,
        });
    });

    workerInstance.on("failed", (job, err) => {
        logger.error("Mailer job failed", {
        jobId: job?.id,
        error: err.message,
        });
    });

    workerInstance.on("error", (err) => {
        logger.error("Mailer worker error", {
        error: err.message,
        });
    });

    return workerInstance;
}