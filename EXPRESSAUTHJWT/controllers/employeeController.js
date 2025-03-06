import { json } from "express";
import AssetModel from "../models/Asset.js";
import EmployeeModel from "../models/Employee.js";
import UserModel from "../models/User.js";

class EmployeeController {
  static getEmployee = async (req, res) => {
    try {
      const totalEmployees = await EmployeeModel.find();
      res.json({
        totalEmployees: totalEmployees,
      });
    } catch (error) {
      res.send({
        status: "failed",
        message: "unable to get employee!",
      });
    }
  };

  static AddEmployee = async (req, res) => {
    const {
      employeeName,
      email,
      joiningDate,
      position,
      salary,
      phoneNumber,
      address,
    } = req.body;

    if (
      !employeeName ||
      !email ||
      !joiningDate ||
      !position ||
      !salary ||
      !phoneNumber ||
      !address
    ) {
      return res.status(400).send({
        status: "failed",
        message: "Please fill all required fields",
      });
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).send({
        status: "failed",
        message: "Phone number must be 10 digits",
      });
    }

    if (isNaN(salary) || salary <= 0) {
      return res.status(400).send({
        status: "failed",
        message: "Salary must be a positive number",
      });
    }

    try {
      const totalEmployees = await EmployeeModel.find();
      const count = totalEmployees.length + 1;
      const newEmployeeId = `EMP${count.toString().padStart(3, "0")}`;

      const employeeData = new EmployeeModel({
        employeeName,
        employeeId: newEmployeeId,
        email,
        joiningDate,
        position,
        salary,
        phoneNumber,
        address,
      });

      await employeeData.save();

      return res.status(201).send({
        status: "Success",
        message: "Employee added successfully!",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      return res.status(500).send({
        status: "failed",
        message: "Unable to add employee!",
        error: error.message,
      });
    }
  };

  static DeleteEmploy = async (req, res) => {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({ message: "Employee ID is required." });
      }
      const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found." });
      }
      return res
        .status(200)
        .json({ message: "Employee deleted successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "An error occurred while deleting the employee.",
          error: error.message,
        });
    }
  };

  static getEmployById = async (req, res) => {
    const { employeeId } = req.params;

    try {
      if (!employeeId) {
        return res.status(400).json({ message: "Employee ID is required." });
      }
      const getEmploy = await EmployeeModel.findOne({ employeeId });

      if (!getEmploy) {
        return res.status(404).json({ message: "Employee not found." });
      }
      return res.status(200).json({ employee: getEmploy });
    } catch (error) {
      return res
        .status(500)
        .json({
          message: "An error occurred while getting the employee.",
          error: error.message,
        });
    }
  };

  static UpdateEmployee = async (req, res) => {
    const { id } = req.params;

    const {
      employeeName,
      employeeId = id,
      email,
      joiningDate,
      position,
      salary,
      phoneNumber,
      address,
    } = req.body;

    if (
      !employeeId ||
      !employeeName ||
      !email ||
      !joiningDate ||
      !position ||
      !salary ||
      !phoneNumber ||
      !address
    ) {
      return res.status(400).send({
        status: "failed",
        message: "Please fill all required fields",
      });
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).send({
        status: "failed",
        message: "Phone number must be 10 digits",
      });
    }

    if (isNaN(salary) || salary <= 0) {
      return res.status(400).send({
        status: "failed",
        message: "Salary must be a positive number",
      });
    }

    try {
      console.log("employee", id);

      const employee = await EmployeeModel.findOne({ employeeId });
      console.log("employee", employee);

      if (!employee) {
        return res.status(404).send({
          status: "failed",
          message: "Employee not found",
        });
      }

      employee.employeeName = employeeName;
      employee.email = email;
      employee.joiningDate = joiningDate;
      employee.position = position;
      employee.salary = salary;
      employee.phoneNumber = phoneNumber;
      employee.address = address;
      employee.employeeId = id;
      await employee.save();

      return res.status(200).send({
        status: "Success",
        message: "Employee updated successfully!",
      });
    } catch (error) {
      console.error("Error updating employee:", error);
      return res.status(500).send({
        status: "failed",
        message: "Unable to update employee!",
        error: error.message,
      });
    }
  };
}

export default EmployeeController;
