import favourites from "../models/favourites.js";

export const favInfoRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await favourites.findOne(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const favDeleteRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await favourites.deleteOne(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const favUpdate = (filter, update) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await favourites.updateOne(filter,update);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const favInsert = (insert) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await favourites.create(insert);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const favListRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await favourites.find(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}