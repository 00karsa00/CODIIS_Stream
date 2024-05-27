import users from "../models/users.js";


export const userInfoRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await users.findOne(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const userRegisterRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await users.find(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const insetUserRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await users.create(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}


export const userUpdateRepo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { filter, updateData } = data;
            let result = await users.updateOne(filter, updateData);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const userListRepo = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let filter = { isDelete: false };
            let pagination = {};
            if (data.name) {
                filter.name = {
                    $regex: data.name,
                    $options: "i"
                }
            }
            if (data.name) {
                filter.name = {
                    $regex: data.name,
                    $options: "i"
                }
            }
            if (data.email) {
                filter.email = {
                    $regex: data.email,
                    $options: "i"
                }
            }
            if (data.phone) {
                filter.name = {
                    $regex: data.phone,
                    $options: "i"
                }
            }
            if (data.address) {
                filter.name = {
                    $regex: data.address,
                    $options: "i"
                }
            }
            if (data.page) {
                const limit = data.limit || 10;
                pagination.skip = (data.page - 1) * limit;
                pagination.limit = limit;
            }
            console.log("pagination => ", pagination, filter)
            let result = await users.find(filter, {}, pagination);
            console.log(result)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const userCount = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let filter = { isDelete: false};
            if (data.name) {
                filter.name = {
                    $regex: data.name,
                    $options: "i"
                }
            }
            if (data.name) {
                filter.name = {
                    $regex: data.name,
                    $options: "i"
                }
            }
            if (data.email) {
                filter.email = {
                    $regex: data.email,
                    $options: "i"
                }
            }
            if (data.phone) {
                filter.name = {
                    $regex: data.phone,
                    $options: "i"
                }
            }
            if (data.address) {
                filter.name = {
                    $regex: data.address,
                    $options: "i"
                }
            }
            let result = await users.countDocuments(filter);
            console.log(result)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}