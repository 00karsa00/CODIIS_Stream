import express from 'express';
const router = express.Router();
import { verifyToken } from '../utils/auth.js';
import { addUserToGroupValidate, createGroupValidate } from '../validation/user.validation.js';
import { addUserToGroup, createGroup, groupDelete, groupInfo, listOfGroup, listOfGroupVideo, removeUserToGroup } from '../controller/group.controller.js';

router.post("/create",verifyToken, createGroupValidate, createGroup);

router.post("/list",verifyToken, listOfGroup);

router.get("/:groupId",verifyToken, groupInfo);

router.delete("/:groupId",verifyToken, groupDelete);

router.post("/:groupId/addUsers",verifyToken, addUserToGroupValidate, addUserToGroup);

router.post("/:groupId/removeUsers",verifyToken, addUserToGroupValidate, removeUserToGroup);

router.post("/:groupId/videos",verifyToken, listOfGroupVideo);

export default router;