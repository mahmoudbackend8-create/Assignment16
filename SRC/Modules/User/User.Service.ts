import type { JwtPayload } from "jsonwebtoken";
import type { Types } from "mongoose";
import UserDbrepo from "../../DB/DB.Reposatory.js/User.Dbrepo.js";
import RedisServices from "../../DB/Redis/Redis.Service.js";

class UserService {
  private _UserService = UserDbrepo;
  private _RedisServices = RedisServices;
  public async logOut(
    userId: string | Types.ObjectId,
    TokenData: JwtPayload,
    LogOutOption: string,
  ) {
    if (LogOutOption == "All") {
      await this._UserService.UpdateOne({
        filter: { _id: userId },
        update: { ChangeCreditTime: new Date() },
      });
    } else {
      await this._RedisServices.set({
        key: this._RedisServices.BlackListKeys({
          userID: TokenData.sub as string,
          TokenID: TokenData.jti as string,
        }),
        value: TokenData.jti as string,
        EXvalue: 60 * 60 * 24 * 365 - (Date.now() / 1000 - TokenData.iat!), //(exRefreshToken -ramain time from initiated)
      });
    }
  }
}
export default new UserService();
