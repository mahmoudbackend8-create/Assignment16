import z from "zod";

export const LogOutSchema = {
  body: z.object({
    LogOutOption: z.enum(["All", "One"]),
  }),
};
