import plans from "../models/plans.js";
import purchases from "../models/purchases.js";
import planVideos from "../models/planVideos.js";

export const createPlanRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await plans.create(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const editPlanRepo = (item, where) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("where => ", where)
            console.log("item => ", item)
            let result = await plans.updateOne(where, item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const planListRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let projection = { name: 1, description: 1, _id: 1,price: 1,duration:1 } 
            let result = await plans.find(item,projection);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const planInfoRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await plans.findOne(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const insertParchaseRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await purchases.create(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const purchasesInfoRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await purchases.findOne(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteVideoRepo = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await planVideos.deleteMany(filter);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const planAddVideoRepo = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await planVideos.insertMany(filter);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const planVideoListRepo = (filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await planVideos.find(filter);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}