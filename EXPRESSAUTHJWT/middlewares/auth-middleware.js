import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      // Verify token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // Get user from token
      req.user = await UserModel.findById(userId).select('-password');
      next();
    } catch (error) {
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  }
  if (!token) {
    res.status(401).send({ status: "failed",messge: "Unauthorized User, No Token" });
  }
};

export default checkUserAuth;