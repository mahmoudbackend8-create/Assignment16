import UserDbrepo from "../../DB/DB.Reposatory.js/User.Dbrepo.js";
import RedisServices from "../../DB/Redis/Redis.Service.js";
class UserService {
    _UserService = UserDbrepo;
    _RedisServices = RedisServices;
    async logOut(userId, TokenData, LogOutOption) {
        if (LogOutOption == "All") {
            await this._UserService.UpdateOne({
                filter: { _id: userId },
                update: { ChangeCreditTime: new Date() },
            });
        }
        else {
            await this._RedisServices.set({
                key: this._RedisServices.BlackListKeys({
                    userID: TokenData.sub,
                    TokenID: TokenData.jti,
                }),
                value: TokenData.jti,
                EXvalue: 60 * 60 * 24 * 365 - (Date.now() / 1000 - TokenData.iat),
            });
        }
    }
}
export default new UserService();
