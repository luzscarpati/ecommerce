import Services from "../classServices.js";
import persistence from "../../persistence/persistence.js";
import { sendMail } from "../users/mailingServices.js";

const { userDao } = persistence;

export default class UserModel extends Services {
    constructor() {
        super(userDao);
    };

    register = async (user) => {
        try{
            const response = await userDao.register(user);
            await sendMail(user, this.register);
            return response
        }catch(error){
            throw new Error (error.message);
        };
    };

    login = async (user) =>{
        try{
            const userExist = await userDao.login(user);
            return userExist;
        }catch(error){
            throw new Error (error.message);
        };
    };
};