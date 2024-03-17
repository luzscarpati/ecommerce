import { Router } from "express";
import { verifyToken } from "../../middlewares/verifyToken.js";
import UserController from "../../controllers/users/userControllers.js";
import { checkAuthCookie } from "../../middlewares/authJwtCookies.js";
import { verifyUser } from "../../middlewares/verifyUser.js";

const controller = new UserController();
const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/profile', verifyToken, controller.profile);
router.get('/profile-cookie', checkAuthCookie, controller.profile);
router.get('/all', verifyUser, controller.getAll);
router.delete('delete', controller.delete);

export default router;
