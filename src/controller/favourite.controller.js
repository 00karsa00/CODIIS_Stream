import { adminInfoRepo, adminRegisterRepo, insetAdminRepo } from "../repository/admin.repository.js";
import { favDeleteRepo, favInfoRepo, favInsert, favListRepo, favUpdate } from "../repository/favourite.repository.js";
import { videoFovListRepo, videoInfoRepo, videoListRepo } from "../repository/video.repository.js";
import { comparePassword, createHashPassword, createToken } from "../utils/common.js";

export const videoAddToFav = async (req, res, next) => {
    try {
        let { videoId } = req.params;
        if (!req.userInfo.isActivePlan) {
            return next({ status: 400, message: "Plan was not active" })
        }
        let videoInfo = await videoInfoRepo({ _id: videoId })
        if (!videoInfo) {
            return next({ status: 400, message: "Video not found" })
        }
        let favInfo = await favInfoRepo({ userId: req.userInfo._id, videoId })
        if(favInfo) {
            return next({status: 400, message: "Video already existing in favourite"})
        }
        await favInsert({ userId: req.userInfo._id, videoId })
        // let favInfo = await favInfoRepo({ userId: req.userInfo._id });
        // if (favInfo) {
        //     console.log(favInfo,favInfo.videoId)
        //     let favList = favInfo.videos;
        //     favList = favList.concat(videoId);
        //     favList = [...new Set(favList)];
        //     await favUpdate({ userId: req.userInfo._id, userId: req.userInfo._id, videos: favList })
        // } else {
        //     await favInsert({ userId: req.userInfo._id, userId: req.userInfo._id, videos: [videoId] })
        // }
        return res.status(200).json({
            error: false,
            message: "Video added to favourite",
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};


export const videoRemoveToFav = async (req, res, next) => {
    try {
        let { favId } = req.params;
        if (!req.userInfo.isActivePlan) {
            return next({ status: 400, message: "Plan was not active" })
        }
        let favInfo = await favInfoRepo({ _id:favId })
        if(!favInfo) {
            return next({status: 400, message: "Already removed in favourite"})
        }
        await favDeleteRepo({ _id:favId }); 
        // let favInfo = await favInfoRepo({ userId: req.userInfo._id });
        // if (favInfo) {
        //     console.log(favInfo,favInfo.videoId)
        //     let favList = favInfo.videos;
        //     let index = favList.indexOf(videoId);
        //     favList.splice(index, 1)
        //     await favUpdate({ userId: req.userInfo._id, userId: req.userInfo._id, videos: favList })
        // } 
        return res.status(200).json({
            error: false,
            message: "Video removed from favourite",
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const favList = async (req, res, next) => {
    try {
        let favInfo = await favListRepo({ userId: req.userInfo._id });
        if (!favInfo) {
            return next({ status: 400, message: "Empty data" });
        } 
        return res.status(200).json({
            error: false,
            message: "Video removed  favourite",
            favInfo
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};
