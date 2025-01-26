import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    employeeName : {type: String, required: true,},
    employeeId: { type: String },
    email: { type: String, required: true, trim: true },
    joiningDate : {type : String, required: true},
});

const EmployeeModel = mongoose.model("employee", EmployeeSchema);

export default EmployeeModel;