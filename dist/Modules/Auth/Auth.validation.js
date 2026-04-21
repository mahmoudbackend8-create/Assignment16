import Z from "zod";
import { UserGender } from "../../Common/Enums/User.Enums.js";
import { CommonValidationFeilds } from "../../MiddleWares/ValidationMiddleWare.js";
export const LoginSchema = {
    body: Z.strictObject({
        Email: CommonValidationFeilds.Email,
        Password: CommonValidationFeilds.Password,
    }),
};
export const SignUpSchema = {
    body: LoginSchema.body
        .extend({
        UserName: CommonValidationFeilds.UserName,
        ConfirmPassword: CommonValidationFeilds.ConfirmPassword,
        Age: CommonValidationFeilds.Age.optional(),
        Gender: CommonValidationFeilds.Gender.optional(),
        Phone: CommonValidationFeilds.Phone.optional(),
    })
        .refine((data) => {
        return data.ConfirmPassword === data.Password;
    }, {
        error: "Confirm password doesn.t match",
    }),
};
