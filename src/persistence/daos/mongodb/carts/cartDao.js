import { response } from "express";
import MongoDao from "../mongoDao.js";
import { CartModel } from "./cartModel.js";

export default class CartsMongoDao extends MongoDao {
    constructor(){
        super(CartModel);
    };

    async createCart(cartData) {
        try {
            const newItem = await CartModel.create(cartData);
            return newItem;
        } catch(error) {
            throw new Error(error.message);
        };
    };

    async getAllCarts(email) {
        try {
            console.log("EMAIL EN DAO------>", email);
            const response = await CartModel.find({ "owner": email });
            return response;
        }catch (error) {
            throw new Error(error.message);
        };
    };

    async addProdToCart(existCart, prodId){
        try{
            const newProd = {
                "quantity" : 1,
                "product" : prodId
            };
            existCart.products.push(newProd);
            await this.model.updateOne({_id: existCart._id}, existCart);
            const response = await CartModel.find({_id: existCart._id})
            return response;
        }catch(error){
            console.log(error);
        };
    };

};
