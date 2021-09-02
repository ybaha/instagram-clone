"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var likesSchema = new mongoose_1.default.Schema({
    userID: String,
});
var postCommentsSchema = new mongoose_1.default.Schema({
    comment: String,
    likes: { type: [likesSchema] },
    username: String,
});
var getDate = function () {
    var date = new Date();
    return date.getTime();
};
var postSchema = new mongoose_1.default.Schema({
    comments: { type: [postCommentsSchema], default: [] },
    date: { type: Number, default: getDate },
    image: String,
    likes: { type: [likesSchema] },
    liked: { type: Boolean, default: false },
    text: String,
    userPicture: { type: String, default: "default" },
    username: String,
});
var model = mongoose_1.default.model("Post", postSchema);
exports.default = model;
