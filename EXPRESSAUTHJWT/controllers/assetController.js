import models from "../models/Asset.js";
const { AssetModel, AssetCategoryModel } = models;
// const multer = require('multer');
// const path = require('path');
import path from "path";
import multer from "multer";

class AssetController {
  static storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/assets/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  static upload = multer({
    storage: AssetController.storage,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }).single("image");

  static AddAssetsAndCategories = async (req, res) => {
    try {
      // File upload handling (optional)
      AssetController.upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({
            status: "failed",
            message: `Image upload failed: ${err.message}`,
          });
        }

        // Destructuring the incoming request body
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

        // Check if all required fields are provided
        if (
          !productName ||
          !categoryData?.category ||
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

        // Check if the category exists, if not, create a new one
        let category = await AssetCategoryModel.findOne({
          category: categoryData.category,
        });

        if (!category) {
          const totalCategory = await AssetCategoryModel.find();
          const count = totalCategory.length + 1;
          const newCategoryId = `${count.toString().padStart(3, "0")}`;

          category = new AssetCategoryModel({
            asset_category_id: newCategoryId,
            category: categoryData.category,
            description: categoryData.description,
            is_laptop: categoryData.is_laptop,
          });

          await category.save();
        }

        // Create asset data
        const assetData = {
          productName,
          category: category._id, // Use the ObjectId of the created category
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
          imagePath: req.file ? req.file.path : null, // If there's an uploaded file, store the path
        };

        // Create and save the asset
        const asset = new AssetModel(assetData);
        await asset.save();

        return res.status(201).json({
          status: "success",
          message: "Asset and Category added successfully.",
          asset,
          category,
        });
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

  // static AddAssetsAndCategories = async (req, res) => {
  //   try {
  //     const {
  //       productName,
  //       categoryData,
  //       serialNumber,
  //       description,
  //       model,
  //       buyingDate,
  //       price,
  //       supplier,
  //       warrantyPeriod,
  //       status,
  //       condition,
  //       location,
  //     } = req.body;

  //     if (
  //       !productName ||
  //       !categoryData.category ||
  //       !serialNumber ||
  //       !model ||
  //       !buyingDate ||
  //       !price ||
  //       !supplier
  //     ) {
  //       return res.status(400).json({
  //         status: "failed",
  //         message: "Please provide all required fields.",
  //       });
  //     }

  //     const category = new AssetCategoryModel({
  //       asset_category_id: categoryData.asset_category_id,
  //       category: categoryData.category,
  //       description: categoryData.description,
  //       is_laptop: categoryData.is_laptop,
  //     });

  //     await category.save();

  //     const asset = new AssetModel({
  //       productName,
  //       category: category._id,
  //       serialNumber,
  //       description,
  //       model,
  //       buyingDate,
  //       price,
  //       supplier,
  //       warrantyPeriod,
  //       status: status || "Available",
  //       condition: condition || "New",
  //       location,
  //     });

  //     await asset.save();

  //     return res.status(201).json({
  //       status: "Success",
  //       message: "Asset and Category added successfully.",
  //       asset: asset,
  //       category: category,
  //     });
  //   } catch (error) {
  //     console.error("Error while adding asset and category: ", error);
  //     return res.status(500).json({
  //       status: "failed",
  //       message: "An error occurred while adding the asset and category.",
  //       error: error.message,
  //     });
  //   }
  // };

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

  static getAssetById = async (req, res) => {
    const { _id } = req.params;

    console.log("asset id ", _id);

    try {
      if (!_id) {
        return res.status(400).json({ message: "ASSET ID is required." });
      }
      const id = await AssetModel.findOne({ _id }).populate("category");

      if (!id) {
        return res.status(404).json({ message: "ASSET not found." });
      }
      return res.status(200).json({ assetDetail: id });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while getting the ASSET.",
        error: error.message,
      });
    }
  };
}

export default AssetController;
