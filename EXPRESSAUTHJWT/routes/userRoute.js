import express from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";
import AssetController from "../controllers/assetController.js";
import EmployeeController from "../controllers/employeeController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
import statusController from "../controllers/statusController.js";
import SkillController from "../controllers/skillsController.js";

//Route Level Middleware - to protect Route
router.use("/changepassword", checkUserAuth);
router.use("/loggeduser", checkUserAuth);

//Public Routes
router.post("/register", UserController.UserRegistration);
router.post("/login", UserController.userLogin);
router.post("/asset", AssetController.AddAssetsAndCategories);
router.get("/get_asset", AssetController.getAsset);
router.get("/get_asset_categories", AssetController.getAssetsAndCategories);
router.post("/employee", EmployeeController.AddEmployee);
router.get("/employ", EmployeeController.getEmployee);
router.post("/add_status", statusController.addStatus);
router.delete("/delete-employe/:id", EmployeeController.DeleteEmployee);
router.get("/get-employe/:employeeId", EmployeeController.getEmployeeById);
router.get("/update-employee/:id", EmployeeController.UpdateEmployee);
router.post(
  "/send-reset-password-email",
  UserController.sendUserPasswordResetEmail
);
router.post("/reset-password/:id/:token", UserController.changeUserPassword);

router.get("/get-asset-detail/:_id", AssetController.getAssetById);

router.post("/add-skills", SkillController.addSkills);
router.get("/skills", SkillController.getSkills);

// Protected Routess
router.post("/changepassword", UserController.changeUserPassword);
router.get("/loggeduser", UserController.loggedUser);

export default router;
