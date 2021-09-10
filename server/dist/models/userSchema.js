"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var ts_mongoose_1 = require("ts-mongoose");
var UserSchema = (0, ts_mongoose_1.createSchema)({
    uid: ts_mongoose_1.Type.string({ required: true, unique: true }),
    username: ts_mongoose_1.Type.string({ required: true, unique: true }),
    profile_picture: ts_mongoose_1.Type.string(),
    real_name: ts_mongoose_1.Type.string(),
    website: ts_mongoose_1.Type.string(),
    bio: ts_mongoose_1.Type.string(),
    email: ts_mongoose_1.Type.string({ required: true, unique: true }),
    following: ts_mongoose_1.Type.array().of({
        uid: ts_mongoose_1.Type.string({ required: true, unique: true }),
        username: ts_mongoose_1.Type.string({ required: true }),
    }),
    posts: ts_mongoose_1.Type.array({ default: [] }).of({
        post_id: ts_mongoose_1.Type.string({ required: true, unique: true }),
    }),
});
exports.User = (0, ts_mongoose_1.typedModel)("User", UserSchema);
