import Controllers from "../classControllers.js";
import ProductService from "../../services/products/productServices.js";

const productService = new ProductService();

export default class ProductController extends Controllers{
    constructor(){
        super(productService);
    };

};