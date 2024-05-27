import group from "../models/groupDetails.js";
import groupUser from "../models/groupUsers.js";

export const createGroupRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await group.create(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const groupListRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            item.isDelete=false;
            let result = await group.find(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const groupInfoRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            item.isDelete=false;
            let result = await group.findOne(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const groupEditRepo = (data,filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data,filter)
            let result = await group.updateOne(filter, data);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteGroupUserRepo = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await groupUser.deleteMany(filter);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const addUserToGroupRepo = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await groupUser.insertMany(filter);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const groupUserListRepo = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await groupUser.find(filter);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}
