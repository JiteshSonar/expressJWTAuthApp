import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import AssetController from '../controllers/assetController.js';
import EmployeeController from '../controllers/employeeController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import statusController from '../controllers/statusController.js';

//Route Level Middleware - to protect Route
router.use('/changepassword', checkUserAuth)

//Public Routes
router.post('/register', UserController.UserRegistration);
router.post('/login', UserController.userLogin);
router.post("/asset", AssetController.AddAssetsAndCategories);
router.get("/get_asset", AssetController.getAsset);
router.get("/get_asset_categories", AssetController.getAssetsAndCategories);
router.post('/employee', EmployeeController.AddEmployee);
router.get('/employ', EmployeeController.getEmployee);

router.post("/add_status", statusController.addStatus);


// Protected Routes
router.post('/changepassword', UserController.changeUserPassword);


export default router;