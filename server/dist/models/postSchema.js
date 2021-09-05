"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var ts_mongoose_1 = require("ts-mongoose");
var getDate = function () {
    var date = new Date();
    return date.getTime();
};
var likesSchema = ts_mongoose_1.createSchema({
    userID: ts_mongoose_1.Type.string({ required: true, unique: true }),
});
var subCommentsSchema = ts_mongoose_1.createSchema({
    comment: ts_mongoose_1.Type.string({ required: true }),
    date: ts_mongoose_1.Type.number({ default: getDate, required: true }),
    likes: ts_mongoose_1.Type.array().of(likesSchema),
    username: ts_mongoose_1.Type.string({ required: true }),
    user_id: ts_mongoose_1.Type.string({ required: true }),
});
var commentsSchema = ts_mongoose_1.createSchema({
    comment: ts_mongoose_1.Type.string({ required: true }),
    comment_id: ts_mongoose_1.Type.string({ required: true }),
    subcomment: ts_mongoose_1.Type.array().of(subCommentsSchema),
    likes: ts_mongoose_1.Type.array().of(likesSchema),
    username: ts_mongoose_1.Type.string({ required: true }),
    date: ts_mongoose_1.Type.number({ default: getDate, required: true }),
    user_id: ts_mongoose_1.Type.string({ required: true }),
});
var postSchema = ts_mongoose_1.createSchema({
    comments: ts_mongoose_1.Type.array().of(commentsSchema),
    date: ts_mongoose_1.Type.number({ default: getDate, required: true }),
    image: ts_mongoose_1.Type.string({ required: true }),
    likes: ts_mongoose_1.Type.array().of(likesSchema),
    liked: ts_mongoose_1.Type.boolean(),
    text: ts_mongoose_1.Type.string(),
    userPicture: ts_mongoose_1.Type.string({ default: "default" }),
    username: ts_mongoose_1.Type.string({ required: true }),
    user_id: ts_mongoose_1.Type.string({ required: true }),
});
exports.Post = ts_mongoose_1.typedModel("Post", postSchema);
// export const Comment = mongoose.model("Comment", commentsSchema);
