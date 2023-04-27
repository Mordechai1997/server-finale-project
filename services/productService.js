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
const addUserNotification = async (productId, userId) => {
    try {

        const id = await productRepo.getUserIdByProductId(productId)
        await productRepo.addUserNotification(id, productId, userId)

    } catch (err) {
        return err;
    }
}
module.exports = productService = {
    getAllFavoritProducts,
    addFavoritProduct,
    removeFavoritProduct,
    getAllMyProducts,
    addUserNotification
}

