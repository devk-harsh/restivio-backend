import { z } from "zod";

import { isoDateString } from "./common.validator";
import { getInclusiveDayCount } from "../utils/date.utils";

export const generateRoomInventorySchema = z
  .object({
    startDate: isoDateString,
    endDate: isoDateString,
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.startDate > data.endDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "startDate must be before or equal to endDate",
        path: ["startDate"],
      });

      return;
    }

    const totalDays = getInclusiveDayCount(
      data.startDate,
      data.endDate
    );

    if (totalDays > 366) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Room inventory can be generated for at most 366 days at a time",
        path: ["endDate"],
      });
    }
  });