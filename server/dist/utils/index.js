"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.u = void 0;
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/temp");
    },
    filename: function (req, file, cb) {
        var name = file === null || file === void 0 ? void 0 : file.originalname;
        cb(null, name);
    },
});
exports.u = multer_1.default({ storage: storage });
