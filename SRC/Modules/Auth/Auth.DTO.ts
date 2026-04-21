import type Z from "zod";
import type { LoginSchema, SignUpSchema } from "./Auth.validation.js";

export type signUpDTO = Z.infer<typeof SignUpSchema.body>; //type of schema
export type LoginDTO = Z.infer<typeof LoginSchema.body>; //type of schema

// export interface signUpDTO extends LoginDTO {
//   UserName: string;
// }
