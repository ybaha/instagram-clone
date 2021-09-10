import multer from "multer";
import ApiClient from "imgbb";
import { promises } from "fs";

const { readFile } = promises;
let key = "a1e4a333e66c1b8d5163332ba42cd473";

export const uploadPhoto = async (
  username: string,
  filePath: string,
  date: number
) => {
  let name = username + "_" + date;
  let api = new ApiClient({
    token: key,
  });
  let bbres: any = await api
    .upload({
      name: name,
      image: await readFile(filePath),
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
