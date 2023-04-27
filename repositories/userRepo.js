const User = require('../models/users');



const updateUserDetails = async (id, email, name, phoneNumber) => {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (user && user.userId !== id)
            throw new Error("Email in use for another user")

        await User.update({ email, username: name, phoneNumber }, { where: { userId: id } });
        
        var newUser = await User.findOne({
            where: {
                userId: id
            }
        });
        return newUser;
    } catch (err) {
        throw err;
    }
}





module.exports = userRepo = {
    updateUserDetails
    
}