class ImageController {
  static postImage = async (req, res) => {
    app.post("/upload", upload.single("image"), (req, res) => {
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }

      // File successfully uploaded
      res.send({
        message: "File uploaded successfully",
        file: req.file,
      });
    });
  };
}
