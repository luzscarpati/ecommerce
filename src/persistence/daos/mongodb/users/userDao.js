import MongoDao from "../mongoDao.js";
import { UserModel } from "./userModel.js";;
import { createHash, isValidPassword } from "../../../../utils/utils.js";
import jwt from "jsonwebtoken";
import config from "../../../../config/config.js";

const SECRET_KEY_JWT = config.SECRET_KEY_JWT

export default class UserMongoDao extends MongoDao {
  constructor() {
    super(UserModel);
  };

  generateToken(user) {
    const payload = {
      userId: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY_JWT, {
      expiresIn: "20m",
    });
    return token;
  };

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.model.findOne({ email });
      if (!existUser) {
        const newUser = await this.model.create({ ...user, password: createHash(password) });
        return newUser;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error.message);
    };
  };

  async login(user) {
    try {
        const { email, password } = user;
        const userExist = await this.getByEmail(email);
        if (userExist) {
            const passValid = isValidPassword(userExist, password);
            if (!passValid) return false;
            else {
                const token = this.generateToken(userExist);
                return { token, userId: userExist._id }; 
            };
        };
        return false;
    } catch (error) {
        throw new Error(error.message);
    }
};


  async getByEmail(email) {
    try {
      const user = await this.model.findOne({ email });
      if (!user) {
        console.log("Usuario no encontrado para el email:", email);
        return null;
      };
      return user;
    } catch (error) {
      throw error;
    };
  };

  async updateLastConnection(userId) {
    try {
      const currentDate = new Date();
      await this.model.findByIdAndUpdate(userId, { lastConnection: currentDate });
    } catch (error) {
      throw new Error(error.message);
    };
  };

};