import models from "../models/Asset.js";
const { AssetModel, AssetCategoryModel } = models;

class AssetController {
  static getAsset = async (req, res) => {
    try {
      const totalAsset = await AssetModel.find();
      return res.status(200).json({
        status: "success",
        message: "Assets fetched successfully",
        totalAsset: totalAsset,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "Unable to get assets!",
        error: error.message,
      });
    }
  };

  static getAssetCategories = async (req, res) => {
    try {
      const assetCategories = await AssetCategoryModel.find();
      return res.status(200).json({
        status: "success",
        message: "Asset Categories fetched successfully",
        assetCategories: assetCategories,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "Unable to get assets!",
        error: error.message,
      });
    }
  };

  static AddAssetsAndCategories = async (req, res) => {
    try {
      const {
        productName,
        categoryData,
        serialNumber,
        description,
        model,
        buyingDate,
        price,
        supplier,
        warrantyPeriod,
        status,
        condition,
        location,
      } = req.body;

      if (
        !productName ||
        !categoryData.category ||
        !serialNumber ||
        !model ||
        !buyingDate ||
        !price ||
        !supplier
      ) {
        return res.status(400).json({
          status: "failed",
          message: "Please provide all required fields.",
        });
      }

      const category = new AssetCategoryModel({
        asset_category_id: categoryData.asset_category_id,
        category: categoryData.category,
        description: categoryData.description,
        is_laptop: categoryData.is_laptop,
      });

      await category.save();

      const asset = new AssetModel({
        productName,
        category: category._id,
        serialNumber,
        description,
        model,
        buyingDate,
        price,
        supplier,
        warrantyPeriod,
        status: status || "Available",
        condition: condition || "New",
        location,
      });

      await asset.save();

      return res.status(201).json({
        status: "Success",
        message: "Asset and Category added successfully.",
        asset: asset,
        category: category,
      });
    } catch (error) {
      console.error("Error while adding asset and category: ", error);
      return res.status(500).json({
        status: "failed",
        message: "An error occurred while adding the asset and category.",
        error: error.message,
      });
    }
  };

  static getAssetsAndCategories = async (req, res) => {
    try {
      const assets = await AssetModel.find().populate("category");
      return res.status(200).json({
        status: "success",
        message: "Assets and Categories fetched successfully",
        assets: assets,
      });
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        message: "An error occurred while fetching assets and categories.",
        error: error.message,
      });
    }
  };
}

export default AssetController;
