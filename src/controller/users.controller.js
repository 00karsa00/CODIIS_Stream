import { insetUserRepo, userInfoRepo, userUpdateRepo, userListRepo, userCount,userRegisterRepo } from "../repository/users.repository.js";
import { createHashPassword, createToken, comparePassword } from "../utils/common.js";

export const userRegister = async (req, res, next) => {
    try {
        let { name, email, password, confirmPassword, phone } = req.body;
        if(password !== confirmPassword) {
            return next({
                status: 400,
                message: "Passwords do not match"
            })
        }
        let userInfos = await userRegisterRepo({
            $or: [
                {
                    email
                }, {
                    phone
                }
            ]
        });
        console.log("userInfos => ",userInfos)
        if (userInfos.length) {
            let isEmail =  userInfos.find(item => item.email == email);
            let isPhone =  userInfos.find(item => item.phone == phone);
            let message = "";
            if(isEmail) message = "Email exists.";
            if(isPhone) message = "Phone number exists.";
            if(isEmail && isPhone) message = "Email and phone number exists.";
            return next({ status: 400, message });
        }
        let hashPassword = await createHashPassword(password)
        await insetUserRepo({ name, email, password: hashPassword, phone });
        return res.status(200).json({
            error: false,
            message: "Register successfully"
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const userInfo = async (req, res, next) => {
    try {
        let userInfo = await userInfoRepo({ _id: req.userInfo._id });
        if (!userInfo) {
            return next({ status: 200, message: "Userid is not found" });
        }
        userInfo = JSON.parse(JSON.stringify(userInfo))
        delete userInfo.password;
        res.status(200).json({
            error: false,
            message: "fetch data successfully",
            userInfo: userInfo
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const updateUserInfo = async (req, res, next) => {
    try {
        let { name, password, phone } = req.body;
        let userInfo = await userInfoRepo({ _id: req.userInfo._id });
        if (!userInfo) {
            return next({ status: 200, message: "Userid is not found" });
        }
        let hashPassword = null;
        if(password) {
            hashPassword = await createHashPassword(password)
        }
        let updateData = {};
        name ? updateData.name = name : "";
        password ? updateData.password = hashPassword : "";
        phone ? updateData.phone = phone : "";
        await userUpdateRepo({ filter: { _id: req.userInfo._id }, updateData });
        res.status(200).json({
            error: false,
            message: "Updated successfully"
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        let { userId } = req.params;
        let userInfo = await userInfoRepo({ _id: userId });
        if (!userInfo) {
            return next({ status: 200, message: "User is not found" });
        }
        
        await userUpdateRepo({ filter: { _id: userId }, updateData:{ isDelete: true }});
        res.status(200).json({
            error: false,
            message: "Updated successfully"
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const getUserList = async (req, res, next) => {
    try {
        let { name, email, phone, address, page, limit } = req.body;
        let [userlist, totalUsers] = await Promise.all([
            userListRepo({ name, email, phone, address, page, limit }),
            userCount({ name, email, phone, address })
        ])
        res.status(200).json({
            error: false,
            message: "fetch data successfully",
            totalUsers,
            userlist
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const userLogin = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        // console.log("eaf => ",email, password)
        let userInfo = await userInfoRepo({ email });
        console.log("userInfo => ",userInfo)
        if (!userInfo) {
            return next({ status: 200, message: "email is not found" });
        }
        let hashPassword = await comparePassword(password, userInfo.password)
        if(hashPassword) {
            let token = await createToken({ userId: userInfo._id, email, role: userInfo.role})
            return res.status(200).json({
                error: false,
                message: "Login Successfully",
                token
            });
        } 
        return next({ status: 200, message: "Password was wrong" });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};
