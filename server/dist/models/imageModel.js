"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var imgSchema = new mongoose_1.default.Schema({
    data: Buffer,
    contentType: String,
    text: String,
});
var model = mongoose_1.default.model("Image", imgSchema);
exports.default = model;
