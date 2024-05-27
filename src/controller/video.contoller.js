import { planInfoRepo, planVideoListRepo, purchasesInfoRepo } from "../repository/plans.repository.js";
import { insetVideoRepo, videoInfoRepo, videoListRepo } from "../repository/video.repository.js";

export const videoUploader = async (req, res, next) => {
    try {
        let { title, description, fileName } = req.body;
        let url = `/uploads/${ fileName }`;
        await insetVideoRepo({ title, description, fileName, url });
        return res.status(200).json({
            error: false,
            message: "Video upload successfully"
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const videoInfo = async (req, res, next) => {
    try {
        let { videoId } = req.params;
        let info = await videoInfoRepo({ _id: videoId });
        return res.status(200).json({
            error: false,
            message: "Video Details fetch successfully.",
            videoInfo: info
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const videoList = async (req, res, next) => {
    try {
        let info = await videoListRepo({});
        return res.status(200).json({
            error: false,
            message: "Video Details fetch successfully.",
            videoInfo: info
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const userVideoInfo = async (req, res, next) => {
    try {
        if(!req.userInfo.isActivePlan) {
            return  next({ status: 400,message: "Plan was not active" })
        }
        let { videoId } = req.params;
        let info = await videoInfoRepo({ _id: videoId });
        let purchases = await purchasesInfoRepo({ _id: req.userInfo.purchasesId})
        let planVideo = await planVideoListRepo({ planId:purchases.planId, videoId });   
        console.log("planVideo => ",planVideo) 
        if(!planVideo.length) {
            return next({ status: 400,message: "You have not valid plan for watch this video" })
        }  
        return res.status(200).json({
            error: false,
            message: "Video Details fetch successfully.",
            videoInfo: info
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const planVideoList = async (req, res, next) => {
    try {
        if(!req.userInfo.isActivePlan) {
            return  next({ status: 400,message: "Plan was not active" })
        }
        let purchases = await purchasesInfoRepo({ _id: req.userInfo.purchasesId})
        let planInfo = await planInfoRepo({_id: purchases.planId})
        if(!planInfo) {
            return  next({ status: 400,message: "Plan was not found" })
        }
        let videoList = await planVideoListRepo({ planId:planInfo._id  })
        return res.status(200).json({
            error: false,
            message: "Video fetch successfully",
            videoList
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};


