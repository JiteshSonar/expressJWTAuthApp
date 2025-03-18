import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const checkUserAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User, No Token" });
  }

  let token = authorization.split(" ")[1];

  try {
    const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await UserModel.findById(userID).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .send({
          status: "failed",
          message: "Unauthorized User, Invalid Token",
        });
    }

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User, Invalid Token" });
  }
};

export default checkUserAuth;
