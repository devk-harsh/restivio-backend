import { mailerQueue, EMAIL_JOB_NAME } from "../queues/mailer.queue";
import { EmailJobPayload } from "../types/email.types";

export async function addEmailToQueue(payload:EmailJobPayload) {
    const job = await mailerQueue.add(EMAIL_JOB_NAME, payload, {
        attempts: 3,
        backoff: {
            type: "fixed",
            delay: 5000, // 5 seconds,
            jitter: 0.5, // Add random jitter to helps avoid many failed jobs retrying at exactly the same moment.
        },
        removeOnComplete: true,
        removeOnFail: false,
    });
    return job;
}