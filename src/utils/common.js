import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const soltKey = process.env.JWT_TOKEN;

export const createToken = (data) => {
    console.log("soltKey  soltKey => ",soltKey)
    return new Promise(async (resolve, reject) => {
        try {
            let token =await jwt.sign(data, soltKey)
            console.log("token => ",token)
            resolve(token)
        } catch(e) {
            reject(e)
        }
    })
};

export const verifyJWTToken = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let decoded =await jwt.verify(token, soltKey)
            resolve(decoded)
        } catch(e) {
            reject(e)
        }
    })
};

export const createHashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
            resolve(hashPassword)
        } catch(e) {
            reject(e)
        }
    })
};

export const comparePassword = (password, hashPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("password => ",hashPassword)
            let isPassword = await bcrypt.compare(password, hashPassword)
            resolve(isPassword)
        } catch(e) {
            reject(e)
        }
    })
};

  