"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.Post = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var getDate = function () {
    var date = new Date();
    return date.getTime();
};
var likesSchema = new mongoose_1.default.Schema({
    userID: String,
});
var subCommentsSchema = new mongoose_1.default.Schema({
    comment: String,
    date: { type: Number, default: getDate },
    likes: { type: [likesSchema], default: [] },
    username: String,
    user_id: String,
});
var commentsSchema = new mongoose_1.default.Schema({
    comment: String,
    comment_id: String,
    subcomment: { type: [subCommentsSchema], default: [] },
    likes: { type: [likesSchema], default: [] },
    username: String,
    date: { type: Number, default: getDate, required: false },
    user_id: String,
});
var postSchema = new mongoose_1.default.Schema({
    comments: { type: [commentsSchema], default: [] },
    date: { type: Number, default: getDate },
    image: String,
    likes: { type: [likesSchema], default: [] },
    liked: { type: Boolean, default: false },
    text: String,
    userPicture: { type: String, default: "default" },
    username: String,
});
var Post = mongoose_1.default.model("Post", postSchema);
exports.Post = Post;
var Comment = mongoose_1.default.model("Comment", commentsSchema);
exports.Comment = Comment;
