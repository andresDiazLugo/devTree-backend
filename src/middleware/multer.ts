import multer from "multer";
import { upload } from "../utils/multer";

export const uploadMiddleware = (req, res, next) => {
  upload.single("avatar")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "La imagen supera los 5 MB",
        });
      }

      return res.status(400).json({
        message: err.message,
      });
    }

    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }

    next();
  });
};