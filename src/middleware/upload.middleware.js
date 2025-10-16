import multer from "multer";
import path from "path";
import fs from "fs";

const baseUploadPath = path.join(process.cwd(), "public", "uploads");

// Ensure folders exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Generic storage creator
const createStorage = (folder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const fullPath = path.join(baseUploadPath, folder);
      ensureDir(fullPath);
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueName + path.extname(file.originalname));
    },
  });

// File filters
const fileFilters = {
  image: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (jpg, png, webp) are allowed!"), false);
    }
  },
  pdf: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
};

// Middleware factory
export const uploadFile = (type) => {
  let storage, fileFilter;

  switch (type) {
    case "image":
      storage = createStorage("images");
      fileFilter = fileFilters.image;
      break;
    default:
      throw new Error("Invalid upload type! Must be 'image' or 'pdf'.");
  }

  return multer({ storage, fileFilter });
};
