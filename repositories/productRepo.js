const UserNotification = require('../models/userNotification');
const Like = require('../models/likes');
const Product = require('../models/product');
const User = require('../models/users');

const sequelize = require('../db');

const addFavoritProduct = async (userId, productId) => {
    try {

        const like = await Like.create(({
            userId: userId,
            productId: productId,
        }))
        return like;

    } catch (err) {
        return err
    }
}
const removeFavoritProduct = async (userId, productId) => {
    try {

        await Like.destroy({
            where: {
                userId: userId,
                productId: productId,
            }
        })
        return null;

    } catch (err) {
        return err
    }
}
const getFavoritProduct = async (userId, productId) => {
    try {

        const like = await Like.findOne({
            where: {
                userId: userId,
                productId: productId,
            }
        });
        return like

    } catch (err) {
        return err
    }
}
const getAllFavoritProducts = async (userId) => {
    try {
        const query = `SELECT * FROM products AS p 
        JOIN likes AS l
        ON l.productId=p.product_id
        WHERE l.userId = ${userId} 
        and  p.active=1 
        ORDER BY 1 DESC`;
        const [results, metadata] = await sequelize.query(query);
        return results

    } catch (err) {
        return err
    }
}
const getAllMyProducts = async (userId) => {
    try {
        const results = await Product.findAll({
            where: {
                user_id: userId,
                active: true
            }
        });
        return results

    } catch (err) {
        return err
    }
}
const getUserIdByProductId = async (productId) => {
    try {

        const product = await Product.findOne({
            where: {
                product_id: productId
            }
        });

        return product.user_id

    } catch (err) {
        return err
    }
}
const addUserNotification = async (id, productId, userId, type) => {
    try {
        const userAlert = await UserNotification.findOne({
            where: {
                userId: id,
                userIdLikeIt: userId,
                productId: productId,
                typeNotification: type
            }
        })
        if (!userAlert) {
            await UserNotification.create({
                userId: id,
                userIdLikeIt: userId,
                productId: productId,
                typeNotification: type
            })
        }
    } catch (err) {
        console.log("\n" + err + "\n")
        throw err;
    }
}
const getAllUserNotifications = async (id) => {
    try {
        const notifications = await UserNotification.findAll({
            where: {
                userId: id
            }
        });

        return notifications;
    } catch (err) {
        throw err;
    }
}
const getUserById = async (id) => {
    try {

        const user = await User.findOne({
            where: {
                userId: id
            }
        });

        return user

    } catch (err) {
        return err
    }
}
module.exports = productRepo = {
    getAllFavoritProducts,
    addFavoritProduct,
    getFavoritProduct,
    removeFavoritProduct,
    getAllMyProducts,
    getUserIdByProductId,
    addUserNotification,
    getAllUserNotifications,
    getUserById
}

