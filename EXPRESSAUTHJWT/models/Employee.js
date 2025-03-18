import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
    trim: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /\S+@\S+\.\S+/.test(v),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[0-9]{10}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  department: {
    type: String,
    required: true,
    enum: [
      "Development",
      "Testing",
      "HR",
      "Finance",
      "Sales",
      "Support",
      "Admin",
    ],
  },
  position: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
  reportingManager: {
    type: String,
    required: true,
    trim: true,
  },
  skills: {
    type: [String], // Array of skills
    required: true,
  },
  workExperience: {
    type: Number, // Years of experience
    required: true,
    min: 0,
  },
  employmentType: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Contract", "Intern"],
    required: true,
  },
  emergencyContact: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    relation: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^[0-9]{10}$/.test(v),
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
  },
  bankDetails: {
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
    },
  },
  documents: {
    aadhaarNumber: {
      type: String,
      required: true,
      unique: true,
    },
    panNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  leaveBalance: {
    type: Number,
    default: 20,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

export default EmployeeModel;
