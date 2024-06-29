import UserModel from "../models/userModel.js";


export const uploadProductPermission  = async (userId) => {
    const user = await UserModel.findById(userId);

    if (user.role !== 'ADMIN') {
        return false;
    }
    return false;
}