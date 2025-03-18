import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";
class UserController {
  static UserRegistration = async (req, res) => {
    const {
      name,
      email,
      password,
      password_confirmation,
      phone,
      address,
      dob,
      isActive = true,
      tc,
      role = "user",
    } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          status: "failed",
          message: "Email already exists",
        });
      }

      // Validate required fields
      if (
        !name ||
        !email ||
        !password ||
        !password_confirmation ||
        !tc ||
        !role
      ) {
        return res.status(400).send({
          status: "failed",
          message: "Required fields are missing",
        });
      }

      // Validate password confirmation
      if (password !== password_confirmation) {
        return res.status(400).send({
          status: "failed",
          message: "Password and confirmation do not match",
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // Create new user instance
      const newUser = new UserModel({
        name,
        email,
        password: hashPassword,
        phone,
        address: {
          street: address?.street || "",
          city: address?.city || "",
          state: address?.state || "",
          zip: address?.zip || "",
        },
        dob: dob ? new Date(dob) : null,
        isActive,
        tc,
        role,
      });

      // Save the new user to the database
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { userID: newUser._id, role: newUser.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5d" }
      );

      // Send response with token and user details
      res.status(201).send({
        status: "success",
        message: "User registered successfully!",
        token: token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
          dob: newUser.dob,
          isActive: newUser.isActive,
          tc: newUser.tc,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: "failed",
        message: "Unable to register user",
      });
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (email != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email == email && isMatch) {
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.send({
              status: "success",
              message: "Login Success!",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Invalid email or password",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a registered user",
          });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    } catch (error) {
      res.send({ status: "failed", message: "Unable to login!" });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;

    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({
          status: "failed",
          message: "New Password and confirm password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });
        res.send({
          status: "failed",
          message: "Password changed succesfully!",
        });
      }
    } else {
      res.send({ status: "failed", message: "All fields are Required" });
    }
  };
  static loggedUser = async (req, res) => {
    res.send({ user: req.user });
  };
  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://localhost:3000/api/user/reset/${user._id}/${token}`;
        console.log(link);
        // Send Email
        // let mailOptions = {
        //   from: process.env.EMAIL_FROM,
        //   to: user.email,
        //   subject: "GeekShop - Password Reset Link",
        //   html: `<a href=${link}>Click Here</a> to Reset Your Password`,
        // };

        // transporter.sendMail(mailOptions, (error, info) => {
        //   if (error) {
        //     console.error("Error sending email:", error);
        //   } else {
        //     console.log("Email sent: " + info.response);
        //   }
        // });

        res.send({
          status: "success",
          message: "Password Reset Email Sent... Please Check Your Email",
        });
      } else {
        res.send({ status: "failed", message: "Email doesn't exists" });
      }
    } else {
      res.send({ status: "failed", message: "Email Field is Required" });
    }
  };
  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;
    const user = await UserModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({
            status: "failed",
            message: "New Password and Confirm New Password doesn't match",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await UserModel.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });
          res.send({
            status: "success",
            message: "Password Reset Successfully",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Invalid Token" });
    }
  };
}

export default UserController;
