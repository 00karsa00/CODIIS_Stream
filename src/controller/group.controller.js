import { addUserToGroupRepo, createGroupRepo, deleteGroupUserRepo, groupEditRepo, groupInfoRepo, groupListRepo, groupUserListRepo } from "../repository/group.repository.js";
import { planInfoRepo, planVideoListRepo, purchasesInfoRepo } from "../repository/plans.repository.js";
import { userInfoRepo } from "../repository/users.repository.js";
import { videoListRepo } from "../repository/video.repository.js";

export const createGroup = async (req, res, next) => {
    try {
        let { groupName, description } = req.body;
        await createGroupRepo({ groupName, description, createdBy: req.userInfo._id })
        return res.status(200).json({
            error: false,
            message: "Group create successfully",
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const listOfGroup = async (req, res, next) => {
    try {
        let list = await groupListRepo({ createdBy: req.userInfo._id })
        return res.status(200).json({
            error: false,
            message: "Fetch date successfully",
            list
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const addUserToGroup = async (req, res, next) => {
    try {
        let { groupId } = req.params;
        let { userIds } = req.body;
        let info = await groupInfoRepo({ _id: groupId });
        if (!info) {
            return next({ status: 400, message: "Group was not found" })
        }
        await deleteGroupUserRepo({ userId: {
            $in: userIds,
        }, groupId}); 
        let insertData = [];
        userIds.map(item => {
            insertData.push({
                groupId,
                userId: item
            })
        })
        await addUserToGroupRepo(insertData)
        return res.status(200).json({
            error: false,
            message: "Friends added successfully",
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const groupInfo = async (req, res, next) => {
    try {
        let { groupId } = req.params;
        let info = await groupInfoRepo({ _id: groupId });
        if (!info) {
            return next({ status: 400, message: "Group was not found" })
        }
        info = JSON.parse(JSON.stringify(info))
        let userList = await groupUserListRepo({ groupId });
        info.userList = userList;
        return res.status(200).json({
            error: false,
            message: "Friends added successfully",
            groupInfo: info
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const groupDelete = async (req, res, next) => {
    try {
        let { groupId } = req.params;
        let info = await groupInfoRepo({ _id: groupId });
        if (!info) {
            return next({ status: 400, message: "Group was not found" })
        }
        console.log({ _id: groupId }, { isDelete: true})
        await groupEditRepo( { isDelete: true},{ _id: groupId })
        console.log("eawrewa => ",{ _id: groupId }, { isDelete: true})
        return res.status(200).json({
            error: false,
            message: "Group remove successfully"
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const removeUserToGroup = async (req, res, next) => {
    try {
        let { groupId } = req.params;
        let { userIds } = req.body;
        let info = await groupInfoRepo({ _id: groupId });
        if (!info) {
            return next({ status: 400, message: "Group was not found" })
        }
        await deleteGroupUserRepo({ userId: {
            $in: userIds,
        }, groupId}); 
        return res.status(200).json({
            error: false,
            message: "Friends remove successfully",
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const listOfGroupVideo = async (req, res, next) => {
    try {
        let { groupId } = req.params;
        let info = await groupInfoRepo({ _id: groupId })
        if(!info) {
            return  next({ status: 400,message: "Group was not found" })
        }
        let isGroup = await groupUserListRepo({ groupId, userId: req.userInfo._id })
        if(!isGroup.length && req.userInfo._id != info.createdBy) {
            return  next({ status: 400,message: "Your not valid any active plan" })
        }
        let userInfo = await userInfoRepo({ _id:info.createdBy })
        if(!userInfo.isActivePlan) {
            return  next({ status: 400,message: "Plan was not active" })
        }
        let purchases = await purchasesInfoRepo({ _id: userInfo.purchasesId})
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
