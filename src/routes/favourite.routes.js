import express from 'express';
const router = express.Router();
import { verifyToken } from '../utils/auth.js';
import { addUserToGroupValidate, createGroupValidate } from '../validation/user.validation.js';
import { addUserToGroup, createGroup, listOfGroup, listOfGroupVideo, removeUserToGroup } from '../controller/group.controller.js';
import { favList, videoAddToFav, videoRemoveToFav } from '../controller/favourite.controller.js';

router.get("/add/:videoId",verifyToken, videoAddToFav);

router.get("/remove/:favId",verifyToken, videoRemoveToFav);

router.post("/list",verifyToken, favList);

export default router;