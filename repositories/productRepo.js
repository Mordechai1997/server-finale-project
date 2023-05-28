const UserNotification = require('../models/userNotification');
const Like = require('../models/likes');
const Product = require('../models/product');
const User = require('../models/users');
const TypeNotification = require('../models/TypeNotification');

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
const getUserIdByNotificationId = async (notificationId) => {
    try {

        const notification = await UserNotification.findOne({
            where: {
                userNotificationId: notificationId
            }
        });

        return notification.userId

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
            },
            order: [['userNotificationId', 'DESC']]
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
const getProductAndCategoryById = async (id) => {
    try {
        const query = `SELECT  * FROM products AS p JOIN categorys AS c ON p.category_type=c.CategoryId 
        WHERE product_id=${id} and active=1  LIMIT 1`;

        const [result, metadata] = await sequelize.query(query);
        return result[0];

    } catch (err) {
        return err;
    }
}
const updateMyProduct = async (data) => {
    try {


        const res = await Product.update({
            title: data.title,
            category_type: data.categoryType,
            image_name: data.fileName,
            city: data.city,
            street: data.street,
            numberAtHome: data.numberAtHome,
            phone_number: data.phone,
            delivery_or_loen: data.deliveryOrLoen,
            description: data.description,
            active: true
        }, { where: { product_id: data.productId, user_id: data.userId } })
        return res;
    } catch (err) {
        return err;
    }
}

const deleteMyProduct = async (productId) => {
    try {
        const resProduct = await Product.destroy({
            where: {
                product_id: productId
            }
        });
        const resLike = await Like.destroy({
            where: {
                productId: productId
            }
        });
        const resUserNotification = await UserNotification.destroy({
            where: {
                productId: productId
            }
        });
        return resProduct, resLike, resUserNotification;
    } catch (err) {
        return err;
    }
}
const userViewedTheAlert = async (notificationId) => {
    try {
        return await UserNotification.update({ userViewedTheAlert: true }, { where: { userNotificationId: notificationId } });
    } catch (err) {
        return err;
    }
}
const ProductsByAdvancedSearch = async (selected, selectedTypeDelivery, title, city, cnt) => {
    try {
        const queryList = `SELECT  * FROM products AS p 
        JOIN categorys AS c ON p.category_type=c.CategoryId
        WHERE title LIKE '%${title}%'AND  city LIKE '%${city}%'AND  c.CategoryId LIKE '%${selected}%' AND p.delivery_or_loen LIKE '%${selectedTypeDelivery}%' and  p.active = 1 ORDER BY 1 DESC LIMIT ${cnt * 9}`;

        const queryCnt = `SELECT  COUNT(*) as cnt FROM products AS p 
        JOIN categorys AS c ON p.category_type=c.CategoryId
        WHERE title LIKE '%${title}%'AND  city LIKE '%${city}%'AND  c.CategoryId LIKE '%${selected}%'
        AND p.delivery_or_loen  LIKE '%${selectedTypeDelivery}%' and  p.active = 1 `;

        const [resultsList, metadataList] = await sequelize.query(queryList);
        const [resultsCnt, metadataCnt] = await sequelize.query(queryCnt);

        list = resultsList.slice(cnt * 9 - 9, cnt * 9);
        count = resultsCnt[0].cnt;
        console.log(resultsCnt,list, count, resultsList)
        return { list, count }
    } catch (err) {
        return err;
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
    getUserById,
    getProductAndCategoryById,
    updateMyProduct,
    deleteMyProduct,
    userViewedTheAlert,
    getUserIdByNotificationId,
    ProductsByAdvancedSearch
}

