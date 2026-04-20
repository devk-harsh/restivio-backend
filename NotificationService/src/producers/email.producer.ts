import { mailerQueue, EMAIL_JOB_NAME } from "../queues/mailer.queue";
import { EmailJobPayload } from "../types/email.types";

export async function addEmailToQueue(payload:EmailJobPayload) {
    const job = await mailerQueue.add(EMAIL_JOB_NAME, payload, {
        removeOnComplete: true,
        removeOnFail: false,
    });
    return job;
}