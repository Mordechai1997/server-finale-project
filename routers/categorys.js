const express = require('express');
const router = express.Router();
const controllerCategorys = require('../controllers/categorys')
const controllerSignin = require('../controllers/login')
var multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, file.originalname)
    },

})

const upload = multer({ storage: storage })

router.get('/getallCategorys', controllerSignin.isAuthControllers, controllerCategorys.getAllCategorys)
router.get('/getProductById', controllerSignin.isAuthControllers, controllerCategorys.getProductById)
router.get('/getAllProducts', controllerSignin.isAuthControllers, controllerCategorys.getAllProducts)
router.post('/addproduct', controllerSignin.isAuthControllers, controllerCategorys.addproduct)
router.get('/getCountProducts', controllerSignin.isAuthControllers, controllerCategorys.getCountProducts)
router.get('/getProductsByRange', controllerSignin.isAuthControllers, controllerCategorys.getProductsByRange)
router.post('/ProductsBySearch', controllerSignin.isAuthControllers, controllerCategorys.ProductsBySearch)
router.post('/addFavoritProduct', controllerSignin.isAuthControllers, controllerCategorys.addFavoritProduct)
router.post('/removeFavoritProduct', controllerSignin.isAuthControllers, controllerCategorys.removeFavoritProduct)
router.get('/getAllFavoritProducts', controllerSignin.isAuthControllers, controllerCategorys.getAllFavoritProducts)
router.get('/getAllMyProducts', controllerSignin.isAuthControllers, controllerCategorys.getAllMyProducts)
router.get('/getMyProductById', controllerSignin.isAuthControllers, controllerCategorys.getMyProductById)
router.post('/updateMyProduct', controllerSignin.isAuthControllers, controllerCategorys.updateMyProduct);
router.post('/deleteMyProduct', controllerSignin.isAuthControllers, controllerCategorys.deleteMyProduct);
router.post('/userViewedTheAlert', controllerSignin.isAuthControllers, controllerCategorys.userViewedTheAlert);








router.post('/uploadimage', upload.single('file'), function (req, res) {
    res.json({})
})




module.exports = router;