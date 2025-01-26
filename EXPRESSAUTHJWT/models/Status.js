import mongoose, { Schema } from "mongoose";

const StatusSchema = new mongoose.Schema({
    name : {String},
    color_code : {String},
    type : {String},
    show_on_dashboard_code : {Boolean},
    is_default_for_status : {Boolean},
    description : {String}
})


const StatusModel = mongoose.model("status", StatusSchema);

// const models = {
//   StatusModel,
// };

export default StatusModel;