"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_1 = require("../../controllers/user");
var utils_1 = require("../../utils");
var router = express_1.default.Router();
exports.UserRouter = router;
router.post("/api/user/create", utils_1.u.single("image"), user_1.createUser);
router.post("/api/user/update", user_1.updateUser);
// router.get("/api/user/get", getAllUsers);
router.get("/api/user/get/:username", user_1.getUser);
