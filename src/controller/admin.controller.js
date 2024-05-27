import { adminInfoRepo, adminRegisterRepo, insetAdminRepo } from "../repository/admin.repository.js";
import { comparePassword, createHashPassword, createToken } from "../utils/common.js";

export const adminRegister = async (req, res, next) => {
    try {
        let { name, email, password, confirmPassword, phone } = req.body;
        if(password !== confirmPassword) {
            return next({
                status: 400,
                message: "Passwords do not match"
            })
        }
        let userInfos = await adminRegisterRepo({
            $or: [
                {
                    email
                }, {
                    phone
                }
            ]
        });
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
        await insetAdminRepo({ name, email, password: hashPassword, phone,role: "admin" });
        return res.status(200).json({
            error: false,
            message: "Admin Register successfully"
        });
    } catch (error) {
        console.log("Error => ", error)
        console.trace();
        next({ message: "Internal Error" })
    }
};

export const adminLogin = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        let userInfo = await adminInfoRepo({ email });
        if (!userInfo) {
            return next({ status: 200, message: "email is not found" });
        }
        let hashPassword = await comparePassword(password, userInfo.password)
        if(hashPassword) {
            let token = await createToken({ userId: userInfo._id, email, role: userInfo.role})
            console.log("token => ",token)
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
