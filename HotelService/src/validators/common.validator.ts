import { z } from "zod";

export const positiveIntegerString = z
  .string()
  .regex(
    /^[1-9]\d*$/,
    "ID must be a positive integer"
  );