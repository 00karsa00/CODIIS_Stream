import express from 'express';
const router = express.Router();
import { adminVerifyToken } from '../utils/auth.js';
import { userAdminValidate, userRegisterValidate, userUpdateValidate } from '../validation/user.validation.js';
import { adminRegister } from '../controller/admin.controller.js';
import { updateUserInfo, userInfo } from '../controller/users.controller.js';

router.post("/register",userRegisterValidate, adminRegister);

router.get("/:userId",adminVerifyToken, userInfo);

router.patch("/update",adminVerifyToken, userUpdateValidate, updateUserInfo);


export default router;