import mongoose, { Schema } from "mongoose";

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // proficiency: {
  //   type: String,
  //   required: true,
  //   enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
  // },
  // experienceInYears: {
  //   type: Number,
  //   required: true,
  //   min: 0,
  // },
});
const SkillModel = mongoose.model("skill", SkillSchema);
export default SkillModel;