import Controllers from "../classControllers.js";
import ProductService from "../../services/products/productServices.js";
//import UserService from "../../services/users/userServices.js";
import { HttpResponse, errorsDictionary } from "../../utils/http.response.js";

const productService = new ProductService();
//const userService = new UserService();
const httpResponse = new HttpResponse();

export default class ProductController extends Controllers{
    constructor(){
        super(productService);
    };
    create = async (req, res, next) => {
        try {
            const { email } = req.user;
            const newItem = await productService.create(req.body, email);

            return httpResponse.Ok(res, newItem);
        } catch(error) {
            return next(error);
        };
    };
};