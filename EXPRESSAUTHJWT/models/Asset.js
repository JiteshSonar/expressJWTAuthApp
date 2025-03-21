import mongoose, { Schema } from "mongoose";

// Asset Category Schema
const AssetCategorySchema = new Schema(
  {
    asset_category_id: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    is_laptop: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true } // Automatically handles `createdAt` and `updatedAt`
);

// Asset Schema
const AssetSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "asset_category",
      required: true,
    },
    serialNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: true,
    },
    buyingDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    warrantyPeriod: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      enum: ["Available", "In Use", "Out of Service"],
      default: "Available",
    },
    condition: {
      type: String,
      enum: ["New", "Used", "Refurbished"],
      default: "New",
    },
    location: {
      type: String,
      required: false,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    imagePath: {
      type: String,
      required: false,
    },
  },
  { timestamps: true } // Automatically handles `createdAt` and `updatedAt`
);

// Update `updatedAt` field before saving
AssetSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Models
const AssetModel = mongoose.model("asset", AssetSchema);
const AssetCategoryModel = mongoose.model(
  "asset_category",
  AssetCategorySchema
);

const models = {
  AssetModel,
  AssetCategoryModel,
};

export default models;
