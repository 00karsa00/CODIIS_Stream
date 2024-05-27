
import { userInfoRepo } from '../repository/users.repository.js';
import { verifyJWTToken } from "../utils/common.js";

export const verifyToken = async (req, res, next) => {
    try {
        let decoded = await verifyJWTToken(req.headers.authorization)
        let userInfo = await userInfoRepo({email:decoded.email});
        if (!userInfo) {
            return next({ message: "invalid token" })
        }
        if (userInfo.role == 'user') {
            req.userInfo = JSON.parse(JSON.stringify(userInfo));
            return next();
        }
        return next({ message: "invalid User token" })
    } catch (e) {
        console.log("Error => ", e)
        console.trace();
        return next({ message: "invalid token" })
    }

};

export const adminVerifyToken = async (req, res, next) => {
    try {

        let decoded = await verifyJWTToken(req.headers.authorization)
        let userInfo = await userInfoRepo({email:decoded.email});
        if (!userInfo) {
            return next({ status: 400, message: "Invalid token" })
        }
        if(userInfo.role == 'admin') {
            req.userInfo = JSON.parse(JSON.stringify(userInfo));
            return next();
        }
        return next({ status: 400, message: "Invalid Admin token" })
    } catch (e) {
        console.log("Error => ", e)
        console.trace();
        return next({ message: "invalid token" })
    }
};

export const commonVerifyToken = async (req, res, next) => {
    try {

        let decoded = await verifyJWTToken(req.headers.authorization)
        console.log("decoded => ",decoded)
        let userInfo = await userInfoRepo({email:decoded.email});
        console.log("userInfo => ",userInfo,userInfo.role )
        if (!userInfo) {
            return next({ status: 400, message: "Invalid token" })
        }
        // if(userInfo.role == 'admin') {
            req.userInfo = JSON.parse(JSON.stringify(userInfo));
            return next();
        // }
        // return next({ status: 400, message: "Invalid Admin token" })
    } catch (e) {
        console.log("Error => ", e)
        console.trace();
        return next({ message: "invalid token" })
    }
};
