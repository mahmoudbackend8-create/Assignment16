import CustomError from "../../Common/Exeptions/CustomError.js";
import {
  BadRequestExeption,
  ConflictExeption,
  NotFoundExeption,
} from "../../Common/Exeptions/DomainExeption.js";
import { bcrypting } from "../../Common/Security/Bcrypting.js";
import { Comparing, Hashing } from "../../Common/Security/Hashing.js";
import TokenService from "../../Common/Security/TokenService.js";
import UserRepo from "../../DB/DB.Reposatory.js/User.Dbrepo.js";
import type { IHUser } from "../../DB/Models/UserModel.js";
import type { LoginDTO, signUpDTO } from "./Auth.DTO.ts";

class AuthService {
  private _UserDbRepo = new UserRepo();
  private _TokenService = TokenService;
  public async SignUp(bodyData: signUpDTO): Promise<IHUser> {
    const { Email } = bodyData;
    const EmailExist = await this._UserDbRepo.findOne({
      filter: { Email },
    });
    if (EmailExist) {
      throw new ConflictExeption("Email Already Exist");
    }
    bodyData.Password = await Hashing({ PlainText: bodyData.Password });
    if (bodyData.Phone) {
      bodyData.Phone = bcrypting({ Value: bodyData.Phone });
    }

    const [User] = await this._UserDbRepo.Create({ data: [bodyData] });
    // throw new CustomError("invalid", 404, { cause: { ADD: "ok" } });cahnged because Custom Err we put Cause direct instead of Options
    // throw new CustomError("invalid", 404, { add: "ok" });
    // throw new BadRequestExeption("invalid", { Add: "NO GOOD" });
    return User!;
  }

  public async Login(bodyData: LoginDTO) {
    const { Email, Password } = bodyData;
    const user = await this._UserDbRepo.findOne({ filter: { Email } });
    if (!user) {
      throw new NotFoundExeption("Invalid User");
    }
    // if (!user.ConfirmEmail) {
    //   throw new BadRequestExeption("Confirm Your Email First");
    // }
    const PassComparing = await Comparing({
      PlainText: Password,
      HashValue: user.Password,
    });
    if (!PassComparing) {
      throw new BadRequestExeption("Invalid Password");
    }
    return this._TokenService.GetAccesAndRefreshToken(user);
  }
}
export default new AuthService();
