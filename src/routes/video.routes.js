import express from 'express';
const router = express.Router();
import { userRegister, userInfo, updateUserInfo, getUserList, userLogin, deleteUser } from "../controller/users.controller.js"
import { userUpdateValidate, videoUploadValidate } from '../validation/user.validation.js';
import { adminVerifyToken, verifyToken } from '../utils/auth.js';
import { fileUpload } from '../utils/fileUpload.js';
import { planVideoList, userVideoInfo, videoInfo, videoList, videoUploader } from '../controller/video.contoller.js';

router.post("/upload",adminVerifyToken,fileUpload,videoUploadValidate, videoUploader);

router.get("/:videoId",adminVerifyToken, videoInfo);

router.post("/list",adminVerifyToken, videoList);

router.post("/videoList",verifyToken, planVideoList);

router.get("/watchVideo/:videoId",verifyToken, userVideoInfo);


export default router;