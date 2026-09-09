import { z } from "zod";

export const positiveIntegerString = z
  .string()
  .regex(
    /^[1-9]\d*$/,
    "ID must be a positive integer"
  );

export const isoDateString = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Date must be in YYYY-MM-DD format"
  )
  .refine(
    (value) => {
      const date = new Date(
        `${value}T00:00:00.000Z`
      );

      return (
        !Number.isNaN(date.getTime()) &&
        date.toISOString().slice(0, 10) === value
      );
    },
    {
      message: "Invalid calendar date",
    }
  );