import MongoDao from "../mongoDao.js";
import { ProductModel } from "./productModel.js";

export default class ProductMongoDao extends MongoDao {
    constructor() {
        super(ProductModel);
    };
};