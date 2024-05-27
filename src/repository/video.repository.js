
import videos from '../models/videos.js';

export const insetVideoRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await videos.create(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const videoInfoRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await videos.findOne(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const videoListRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await videos.find(item);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

export const videoFovListRepo = (item) => {
    return new Promise(async (resolve, reject) => {
        try {
            let projection = { title: 1, description: 1, fileName: 1,_id: 1 } 
            let result = await videos.find(item,projection);
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

