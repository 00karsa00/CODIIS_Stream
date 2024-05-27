import users from "../models/users.js";

export const adminRegisterRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await users.find(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const insetAdminRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await users.create(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}


export const adminInfoRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("item => ",item);
            item.role = "admin";
            let result = await users.findOne(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}


export const adminUpdateRepo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { filter, updateData } = data;
            filter.role = "admin";
            let result = await users.updateOne(filter, updateData);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}
