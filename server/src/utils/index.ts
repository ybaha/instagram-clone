import multer from "multer";

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/temp");
  },
  filename: function (req, file, cb) {
    let name = file?.originalname;
    cb(null, name);
  },
});

export const u = multer({ storage: storage });
