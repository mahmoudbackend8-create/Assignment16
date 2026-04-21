import CustomError from "../../Common/Exeptions/CustomError.js";
import { BadRequestExeption, ConflictExeption, NotFoundExeption, } from "../../Common/Exeptions/DomainExeption.js";
import { bcrypting } from "../../Common/Security/Bcrypting.js";
import { Comparing, Hashing } from "../../Common/Security/Hashing.js";
import TokenService from "../../Common/Security/TokenService.js";
import UserRepo from "../../DB/DB.Reposatory.js/User.Dbrepo.js";
class AuthService {
    _UserDbRepo = new UserRepo();
    _TokenService = TokenService;
    async SignUp(bodyData) {
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
        return User;
    }
    async Login(bodyData) {
        const { Email, Password } = bodyData;
        const user = await this._UserDbRepo.findOne({ filter: { Email } });
        if (!user) {
            throw new NotFoundExeption("Invalid User");
        }
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
