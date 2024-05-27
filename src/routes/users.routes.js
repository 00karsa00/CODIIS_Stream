import express from 'express';
const router = express.Router();
import { userRegister, userInfo, updateUserInfo, getUserList, userLogin, deleteUser } from "../controller/users.controller.js"
import { userRegisterValidate, userUpdateValidate } from '../validation/user.validation.js';
import { verifyToken } from '../utils/auth.js';

router.post("/register",userRegisterValidate, userRegister);

router.get("/:userId",verifyToken, userInfo);

router.patch("/:userId",verifyToken, userUpdateValidate, updateUserInfo);

router.post("/login", userLogin);

export default router;