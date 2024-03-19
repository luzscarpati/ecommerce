import Services from "../classServices.js";
import persistence from "../../persistence/persistence.js";
import { sendMail } from "../users/mailingServices.js";

const { productDao, userDao } = persistence;

export default class ProductService extends Services {
    constructor(){
        super(productDao);
    };

    create = async (productData, ownerEmail) => {
        try {
            productData.product_owner = ownerEmail;
            const newItem = await productDao.create(productData);
            return newItem;
        } catch(error) {
            throw new Error(error.message);
        };
    };

    delete = async (id) => {
        try{
            let item = await this.dao.getById(id);
            const user = await userDao.getByEmail(item.product_owner);
            if(!item){
                return false;
            }else {
                const itemDeleted = await this.dao.delete(id);
                await sendMail(user, 'deleteproduct')
                return itemDeleted;
            }
        }catch(error){
            throw new Error(error.message);
        };
    };

};