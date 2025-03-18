import SkillModel from "../models/Skills.js";

class SkillController {
  static addSkills = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          status: "failed",
          message: "Please provide all required fields.",
        });
      }

      let skill = await SkillModel.findOne({
        name: name,
      });

      if (!skill) {
        skill = new SkillModel({
          name: name,
        });

        await skill.save();

        return res.status(201).json({
          status: "success",
          skill,
        });
      } else {
        return res.status(201).json({
          status: "failed",
          message: "Already have this skill!",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "An error occurred while adding skills.",
        error: error.message,
      });
    }
  };
  static getSkills = async (req, res) => {
    try {
      const skills = await SkillModel.find();
      return res.status(200).json({
        status: "success",
        message: "skills fetched successfully",
        skills: skills,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "Unable to get skills!",
        error: error.message,
      });
    }
  };
}

export default SkillController;
