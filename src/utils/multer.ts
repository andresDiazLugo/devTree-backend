import multer from "multer";

export const upload = multer({
    dest: "uploads/", // Specify the destination folder for uploaded files
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
    },
    fileFilter: (req, file, cb) => {
      if((file.mimetype === "image/jpeg" || file.mimetype === "image/png")) {
        cb(null, true);
      } else {
        cb(new Error("Only JPEG and PNG images are allowed"));
      } 
    }
})