import AssetModel from "../models/Asset.js";
import EmployeeModel from "../models/Employee.js";
import UserModel from "../models/User.js";

class EmployeeController {

    static getEmployee = async (req, res) => {
        try {
            const totalEmployees = await EmployeeModel.countDocuments();
            res.json({
                totalEmployees: totalEmployees
            });
        
        } catch (error) {
            res.send({
                status: "failed",
                message: "unable to get employee!",
            });
        }
    }
    static AddEmployee = async (req, res) => {
        const { employeeName, employeeId, joiningDate, email } = req.body;
        const lastEmploy = await EmployeeModel.findOne().sort({ _id: -1 });
        console.log("lastEmploy -> ", lastEmploy);
    
        // const employeeCount = await EmployeeModel.countDocuments();
        // console.log(employeeCount);
        const indexOfDigits = lastEmploy.employeeId.search(/\d/);
        const numPart = lastEmploy.employeeId.slice(indexOfDigits); 
        // console.log(employeeCount);
        // if(employeeCount)
        var count = (parseInt(numPart) + 1)

        if (employeeName && joiningDate && email) {
            try {
                const employeeData = new EmployeeModel({
                    employeeName: employeeName,
                    employeeId: `SSSPL0${count}`,
                    joiningDate: joiningDate,
                    email : email
                });
                await employeeData.save();
                res.status(201).send({
                    status: "Success",
                    message: "Employee added successfully!",
                });
            } catch (error) {
                res.send({
                    status: "failed",
                    message: "unable to add employee!",
                });
            }
        } else {
            res.send({
                status: "failed",
                message: "please fill all required values",
            });
        }
    }
}

export default EmployeeController;