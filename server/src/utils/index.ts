import multer from "multer";
import ApiClient from "imgbb";
import { promises as fsP, default as fs } from "fs";

let key = "a1e4a333e66c1b8d5163332ba42cd473";

export const uploadPhoto = async (
  username: string,
  filePath: string,
  date: number
) => {
  let name = username + "_" + date;

  if (!fs.existsSync("../temp")) {
    await fsP.mkdir("../temp");
  }

  let api = new ApiClient({
    token: key,
  });
  let bbres: any = await api
    .upload({
      name: name,
      image: await fsP.readFile(filePath),
    })
    .catch((e) => console.log(e));

  let imageUrl = bbres.data?.image?.url;
  return imageUrl;
};

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
