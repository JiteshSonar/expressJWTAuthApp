import StatusModel from "../models/Status.js";

class statusController {
  static addStatus = async (req, res) => {
    const {
      name,
      color_code,
      type,
      show_on_dashboard_code,
      is_default_for_status,
      description,
    } = req.body;

    try {
      const status = new StatusModel({
        name: name,
        color_code: color_code,
        type: type,
        show_on_dashboard_code: show_on_dashboard_code,
        is_default_for_status: is_default_for_status,
        description: description,
      });
      await status.save();
      res
        .status(201)
        .send({ status: "success", message: "status added successfully!" })
        .json({ status });
    } catch (error) {
      res.send({
        status: "failed",
        message: "unable to add status!",
      });
    }
  };
}

export default statusController;
