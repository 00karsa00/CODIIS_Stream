import { createPlanRepo, deleteVideoRepo, editPlanRepo, insertParchaseRepo, planAddVideoRepo, planInfoRepo, planListRepo, planVideoListRepo } from "../repository/plans.repository.js";
import { userInfoRepo, userUpdateRepo } from "../repository/users.repository.js";
import { videoList } from './video.contoller.js';


export const createPlan = async (req, res, next) => {
    try {
        let { name, description, price, duration } = req.body;
        await createPlanRepo( { name, description, price, duration });
        res.status(200).json({
            error: false,
            message: "Plan created successfully"
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const planInfo = async (req, res, next) => {
    try {
        let { planId } = req.params;
        let planInfo = await planInfoRepo({ _id:planId ,isDelete: false });
        if(!planInfo) {
            next({ status:400, message: "Plan was not found" })
        }
        planInfo = JSON.parse(JSON.stringify(planInfo))
        let videoList = await planVideoListRepo({ planId });
        planInfo.videoList = videoList;
        res.status(200).json({
            error: false,
            message: "Plan fetch successfully",
            planInfo
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const editPlan = async (req, res, next) => {
    try {
        let { name, description, price, duration } = req.body;
        let { planId } = req.params;
        await editPlanRepo( { name, description, price, duration }, { _id: planId } );
        res.status(200).json({
            error: false,
            message: "Plan updated successfully"
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const deletePlan = async (req, res, next) => {
    try {
        let { planId } = req.params;
        await editPlanRepo( { isDelete: true }, { _id: planId } );
        res.status(200).json({
            error: false,
            message: "Plan delete successfully"
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const planLists = async (req, res, next) => {
    try {
        let list = await planListRepo({ isDelete: false });
        res.status(200).json({
            error: false,
            message: "Fetch plan list successfully",
            list
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};


export const addVideoToPlan = async (req, res, next) => {
    try {
        let { videoId } = req.body;
        let { planId } = req.params;
        let planInfo = await planInfoRepo({ _id:planId ,isDelete: false });
        if(!planInfo) {
            next({ status: 400, message: "Plan is not found." })
        }
        await deleteVideoRepo({ videoId: {
            $in: videoId,
        }, planId}); 
        let insertData = [];
        videoId.map(item => {
            insertData.push({
                planId,
                videoId: item
            })
        })
        await planAddVideoRepo(insertData)
        // await addUserToGroupRepo(insertData)
        // planInfo = JSON.parse(JSON.stringify(planInfo))
        // let videoList  = planInfo.videoId;
        // videoList = videoList.concat(videoId);
        // videoList = [...new Set(videoList)];
        // await editPlanRepo( { videoId: videoList }, { _id: planId } );
        res.status(200).json({
            error: false,
            message: "Videos added successfully",
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const removeVideoToPlan = async (req, res, next) => {
    try {
        let { videoId } = req.body;
        let { planId } = req.params;
        let planInfo = await planInfoRepo({ _id:planId ,isDelete: false });
        if(!planInfo) {
            next({ status: 400, message: "Plan is not found." })
        }
        await deleteVideoRepo({ videoId: {
            $in: videoId,
        }, planId}); 
        // planInfo = JSON.parse(JSON.stringify(planInfo))
        // let videoList  = planInfo.videoId;
        // for(let item of videoId) {
        //     let index = videoList.indexOf(item);
        //     if(index >= 0) {
        //         videoList.splice(index, 1);
        //         console.log("videoList 1111 => ",index)
        //     }
        // }
        // await editPlanRepo( { videoId: videoList }, { _id: planId } );
        res.status(200).json({
            error: false,
            message: "Videos remvoe successfully",
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const userpurchasePlan = async (req, res, next) => {
    try {
        let { planId } = req.params;
        let userId = req.userInfo._id;
        let userInfo = await userInfoRepo({ _id: userId });
        if(userInfo.isActivePlan) {
            return next({ status: 400, message: "Already some paln is active" })
        }
        let planInfo = await planInfoRepo({ _id:planId ,isDelete: false });
        if(!planInfo) {
            return next({ status: 400, message: "Plan is not found." })
        }
        let nowDate = new Date();
        let exprirDate = new Date();
        exprirDate.setMonth(nowDate.getMonth()+planInfo.duration);
        exprirDate = new Date(exprirDate);
        let parchase = await insertParchaseRepo({ planId, userId, purchaseDate: nowDate , expiryDate:exprirDate});
        if(parchase) {
            await userUpdateRepo({ filter: { _id: req.userInfo._id }, updateData: { isActivePlan: true,purchasesId: parchase._id } });
        }
        res.status(200).json({
            error: false,
            message: "Purchase plan successfully",
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};