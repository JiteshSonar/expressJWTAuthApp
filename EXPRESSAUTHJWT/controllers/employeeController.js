import EmployeeModel from "../models/Employee.js";

class EmployeeController {
  static getEmployee = async (req, res) => {
    try {
      const employees = await EmployeeModel.find();
      res.json({ employees });
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Unable to get employees!",
        error: error.message,
      });
    }
  };

  static AddEmployee = async (req, res) => {
    const {
      employeeName,
      email,
      phoneNumber,
      address,
      dateOfBirth,
      gender,
      department,
      position,
      joiningDate,
      salary,
      reportingManager,
      skills,
      workExperience,
      employmentType,
      emergencyContact,
      bankDetails,
      documents,
      leaveBalance,
    } = req.body;

    if (
      !employeeName ||
      !email ||
      !phoneNumber ||
      !address ||
      !dateOfBirth ||
      !gender ||
      !department ||
      !position ||
      !joiningDate ||
      !salary ||
      !reportingManager ||
      !skills ||
      !workExperience ||
      !employmentType ||
      !emergencyContact ||
      !bankDetails ||
      !documents
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Please fill all required fields",
      });
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({
        status: "failed",
        message: "Phone number must be 10 digits",
      });
    }

    if (isNaN(salary) || salary <= 0) {
      return res.status(400).json({
        status: "failed",
        message: "Salary must be a positive number",
      });
    }

    try {
      const totalEmployees = await EmployeeModel.countDocuments();
      const newEmployeeId = `EMP${(totalEmployees + 1)
        .toString()
        .padStart(3, "0")}`;

      const employeeData = new EmployeeModel({
        employeeName,
        employeeId: newEmployeeId,
        email,
        phoneNumber,
        address,
        dateOfBirth,
        gender,
        department,
        position,
        joiningDate,
        salary,
        reportingManager,
        skills,
        workExperience,
        employmentType,
        emergencyContact,
        bankDetails,
        documents,
        leaveBalance: leaveBalance ?? 20,
        isActive: true,
      });

      await employeeData.save();

      return res.status(201).json({
        status: "success",
        message: "Employee added successfully!",
        employee: employeeData,
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      return res.status(500).json({
        status: "failed",
        message: "Unable to add employee!",
        error: error.message,
      });
    }
  };

  static DeleteEmployee = async (req, res) => {
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
      return res.status(500).json({
        message: "An error occurred while deleting the employee.",
        error: error.message,
      });
    }
  };

  static getEmployeeById = async (req, res) => {
    const { employeeId } = req.params;

    try {
      if (!employeeId) {
        return res.status(400).json({ message: "Employee ID is required." });
      }
      const employee = await EmployeeModel.findOne({ employeeId });

      if (!employee) {
        return res.status(404).json({ message: "Employee not found." });
      }
      return res.status(200).json({ employee });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while getting the employee.",
        error: error.message,
      });
    }
  };

  static UpdateEmployee = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;

    if (
      updateFields.phoneNumber &&
      !/^\d{10}$/.test(updateFields.phoneNumber)
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Phone number must be 10 digits",
      });
    }

    if (
      updateFields.salary &&
      (isNaN(updateFields.salary) || updateFields.salary <= 0)
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Salary must be a positive number",
      });
    }

    try {
      const employee = await EmployeeModel.findByIdAndUpdate(id, updateFields, {
        new: true,
        runValidators: true,
      });

      if (!employee) {
        return res.status(404).json({
          status: "failed",
          message: "Employee not found",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Employee updated successfully!",
        employee,
      });
    } catch (error) {
      console.error("Error updating employee:", error);
      return res.status(500).json({
        status: "failed",
        message: "Unable to update employee!",
        error: error.message,
      });
    }
  };
}

export default EmployeeController;
