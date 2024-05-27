import express from 'express';
const router = express.Router();
import { adminVerifyToken, commonVerifyToken, verifyToken} from '../utils/auth.js';
import { addVideoValidate, createPlanValidate, editPlanValidate } from '../validation/user.validation.js';
import { addVideoToPlan, createPlan, deletePlan, editPlan, planInfo, planLists, removeVideoToPlan, userpurchasePlan } from '../controller/plans.controller.js';

router.post("/create", adminVerifyToken, createPlanValidate,  createPlan);

router.patch("/:planId", adminVerifyToken, editPlanValidate, editPlan);

router.get("/:planId", adminVerifyToken, planInfo);

router.delete("/:planId", adminVerifyToken, deletePlan);

router.post("/list", commonVerifyToken, planLists);

router.post("/:planId/addVideo", adminVerifyToken, addVideoValidate, addVideoToPlan);

router.post("/:planId/removeVideo", adminVerifyToken, addVideoValidate, removeVideoToPlan);

router.get("/:planId/purchase", verifyToken, userpurchasePlan);

export default router;