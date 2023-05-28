const productRepo = require('../repositories/productRepo');

const addFavoritProduct = async (userId, productId) => {
    try {
        const like = await productRepo.getFavoritProduct(userId, productId)
        if (like) {
            return like;
        }
        return await productRepo.addFavoritProduct(userId, productId)

    } catch (err) {
        return err;
    }
}
const removeFavoritProduct = async (userId, productId) => {
    try {
        const like = await productRepo.getFavoritProduct(userId, productId)
        if (like) {
            return await productRepo.removeFavoritProduct(userId, productId)
        }
        return like;

    } catch (err) {
        return err;
    }
}
const getAllFavoritProducts = async (userId) => {
    try {
        const allLikes = await productRepo.getAllFavoritProducts(userId)
        return allLikes;

    } catch (err) {
        return err;
    }
}

const getAllMyProducts = async (userId) => {
    try {
        const allMyProducts = await productRepo.getAllMyProducts(userId)
        return allMyProducts;

    } catch (err) {
        return err;
    }
}
const addUserNotification = async (productId, userId, type) => {
    try {

        const id = await productRepo.getUserIdByProductId(productId)
        await productRepo.addUserNotification(id, productId, userId, type)

    } catch (err) {
        return err;
    }
}
const getUserById = async (id) => {
    try {

        const user = await productRepo.getUserById(id)

        return user;
    } catch (err) {
        return err;
    }
}
const getMyProductAndCategoryById = async (id, userId) => {
    try {

        const product = await productRepo.getProductAndCategoryById(id)
        if (product.user_id === userId) {
            return product;

        }
        return null;

    } catch (err) {
        return err;
    }
}
const updateMyProduct = async (data) => {
    try {
        const productId = data.productId;
        const userId = await productRepo.getUserIdByProductId(productId)
        if (data.userId === userId) {
            return await productRepo.updateMyProduct(data);;
        }
        return null;

    } catch (err) {
        return err;
    }
}
const deleteMyProduct = async (productId, userId) => {
    try {
        const userIdByProductId = await productRepo.getUserIdByProductId(productId)

        if (userIdByProductId === userId) {
            return await productRepo.deleteMyProduct(productId);;
        }
        return null;

    } catch (err) {
        return err;
    }
}
const userViewedTheAlert = async (notificationId, userId) => {
    try {
        const userIdByNotificationId = await productRepo.getUserIdByNotificationId(notificationId)
        console.log("\n" + userIdByNotificationId, userId + "\n")
        if (userIdByNotificationId === userId) {
            return await productRepo.userViewedTheAlert(notificationId);;
        }
        return null;

    } catch (err) {
        return err;
    }
}
const ProductsByAdvancedSearch = async (selected, selectedTypeDelivery, title, city, cnt) => {
    try {
        const { list, count } = await productRepo.ProductsByAdvancedSearch(selected, selectedTypeDelivery, title, city, cnt)
        console.log(list, count)
        return { list, count };

    } catch (err) {
        return err;
    }
}
module.exports = productService = {
    getAllFavoritProducts,
    addFavoritProduct,
    removeFavoritProduct,
    getAllMyProducts,
    addUserNotification,
    getUserById,
    getMyProductAndCategoryById,
    updateMyProduct,
    deleteMyProduct,
    userViewedTheAlert,
    ProductsByAdvancedSearch
}

