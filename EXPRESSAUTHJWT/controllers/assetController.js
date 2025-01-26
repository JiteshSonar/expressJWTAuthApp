import models from "../models/Asset.js";
const { AssetModel, AssetCategoryModel } = models;

class AssetController {
  //   static AddAsset = async (req, res) => {
  //     const {
  //       productName,
  //       categoryId,
  //       serialNumber,
  //       description,
  //       model,
  //       buyingDate,
  //       price,
  //     } = req.body;
  //     const category = await AssetCategoryModel.findById(asset_category_id);
  //     if (productName && serialNumber && model && buyingDate && price) {
  //       try {
  //         const assetData = new AssetModel({
  //           productName: productName,
  //           category: category,
  //           serialNumber: serialNumber,
  //           description: description,
  //           model: model,
  //           buyingDate: buyingDate,
  //           price: price,
  //         });
  //         await assetData.save();
  //         res
  //           .status(201)
  //           .send({
  //             status: "Success",
  //             message: "Asset is added successfully!",
  //           })
  //           .json(assetData);
  //       } catch (error) {
  //         res.send({
  //           status: "failed",
  //           message: "unable to add asset!",
  //         });
  //       }
  //     } else {
  //       res.send({
  //         status: "failed",
  //         message: "please fill all required values",
  //       });
  //     }
  //   };

  static getAsset = async (req, res) => {
    try {
      const totalAssetcount = await AssetModel.countDocuments();
      const totalAsset = await AssetModel.find();
      res.json({
          totalAssetcount: totalAssetcount,
          totalAsset: totalAsset,
        })
        .send({
          status: "success",
          message: totalAsset,
        });
    } catch (error) {
      res.send({
        status: "failed",
        message: "unable to get Asset!",
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
      } = req.body;

      const category = new AssetCategoryModel(categoryData);
      await category.save();

      const asset = new AssetModel({
        productName,
        category: category._id, 
        serialNumber,
        description,
        model,
        buyingDate,
        price,
      });

      await asset.save();
      res.status(201).json({ asset, category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static getAssetsAndCategories = async (req, res) => {
    try {
        const assets = await AssetModel.find();
        const assCategories = await AssetCategoryModel.find();
        res.json({
            assets : assets,
            assCategories : assCategories
        })
        send({
          status: "success",
          message: totalAsset,
        });
    } catch (error) {
        send({
          status: "failed",
          message: error.message,
        });
    }
  };
}

export default AssetController;
