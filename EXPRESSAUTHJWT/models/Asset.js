import mongoose, { Schema } from "mongoose";

const AssetSchema = new mongoose.Schema({
  productName: { type: String, required: true, trim: true },
  category: { type: Schema.Types.ObjectId, ref: "asset_category" },
  serialNumber: { type: String, required: true, trim: true },
  description: { type: String, required: false },
  model: { type: String, required: true },
  buyingDate: { type: String, required: true, trim: true },
  price: { type: String, required: true, trim: true },
});


const AssetCategorySchema = new mongoose.Schema({
  asset_category_id: { type: Number, required: true },
  category: { String },
  description: { String },
  is_laptop: { Boolean },
});

const AssetModel = mongoose.model("asset", AssetSchema);
const AssetCategoryModel = mongoose.model("asset_category", AssetCategorySchema);


const models = {
  AssetModel,
  AssetCategoryModel,
};

export default models;
