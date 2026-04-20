export interface EmailJobPayload {
    to: string;
    subject: string;
    templateId: string; 
    params : Record<string, unknown>;
}