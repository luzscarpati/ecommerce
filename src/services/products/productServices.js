import Services from "../classServices.js";
import persistence from "../../persistence/persistence.js";

const { productDao } = persistence;

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

};