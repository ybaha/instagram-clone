"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var ts_mongoose_1 = require("ts-mongoose");
var UserSchema = ts_mongoose_1.createSchema({
    user_id: ts_mongoose_1.Type.string({ required: true, unique: true }),
    username: ts_mongoose_1.Type.string({ required: true, unique: true }),
    real_name: ts_mongoose_1.Type.string(),
    website: ts_mongoose_1.Type.string(),
    bio: ts_mongoose_1.Type.string(),
    email: ts_mongoose_1.Type.string({ required: true, unique: true }),
    following: [
        {
            user_id: ts_mongoose_1.Type.string({ required: true, unique: true }),
            username: ts_mongoose_1.Type.string({ required: true }),
        },
    ],
    posts: [{ post_id: ts_mongoose_1.Type.string({ required: true, unique: true }) }],
});
exports.User = ts_mongoose_1.typedModel("User", UserSchema);
