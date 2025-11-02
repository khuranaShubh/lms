import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";
import fs from "fs"; // ✅ To delete local files after upload

const router = express.Router();

router.post("/upload-video", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file provided" });
    }

    // ✅ Upload to Cloudinary
    const result = await uploadMedia(req.file.path);

    // ✅ Delete the temp file from uploads folder after upload
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading file.",
      error: error.message,
    });
  }
});

export default router;
