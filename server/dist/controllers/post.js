"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOnPost = exports.likePost = exports.createPost = exports.createUniquePost = void 0;
var postSchema_1 = require("../models/postSchema");
var nanoid_1 = require("nanoid");
var mongoose_1 = __importDefault(require("mongoose"));
var utils_1 = require("../utils");
var userSchema_1 = require("../models/userSchema");
var createUniquePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, file, date, imageUrl, response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                file = req.file;
                date = Date.now();
                return [4 /*yield*/, (0, utils_1.uploadPhoto)(body.username, file.path, date)];
            case 1:
                imageUrl = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, , 6]);
                return [4 /*yield*/, postSchema_1.Post.create({
                        username: body.username,
                        user_id: body.user_id,
                        text: body.text,
                        image: imageUrl,
                        date: date,
                    })];
            case 3:
                response = _a.sent();
                console.log(response);
                console.log(response._id);
                return [4 /*yield*/, userSchema_1.User.findOneAndUpdate({
                        uid: body.uid,
                    }, { $addToSet: { posts: { post_id: response._id } } }).exec()];
            case 4:
                _a.sent();
                console.log("Created new post -> ", response._id);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6:
                if (response)
                    return [2 /*return*/, res.send({ success: true })];
                else
                    return [2 /*return*/, res.send({ success: false })];
                return [2 /*return*/];
        }
    });
}); };
exports.createUniquePost = createUniquePost;
var createPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postSchema_1.Post.create(req.body)];
            case 1:
                response = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log(err_2);
                return [3 /*break*/, 3];
            case 3:
                if (response)
                    return [2 /*return*/, res.send({ success: true })];
                else
                    return [2 /*return*/, res.send({ success: false })];
                return [2 /*return*/];
        }
    });
}); };
exports.createPost = createPost;
var likePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, post, isLiked;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                return [4 /*yield*/, postSchema_1.Post.findOne({ _id: data.postId }).exec()];
            case 1:
                post = _a.sent();
                return [4 /*yield*/, postSchema_1.Post.findOneAndUpdate({
                        $and: [
                            { _id: data.postId },
                            { likes: { $elemMatch: { user_id: data.user_id } } },
                        ],
                    }, { $pull: { likes: { user_id: data.user_id } } })
                        .exec()
                        .catch(function (e) {
                        console.log(e);
                    })];
            case 2:
                isLiked = _a.sent();
                if (!!isLiked) return [3 /*break*/, 4];
                return [4 /*yield*/, postSchema_1.Post.findOneAndUpdate({
                        $and: [
                            { _id: data.postId },
                            { likes: { $not: { $elemMatch: { v: data.user_id } } } },
                        ],
                    }, { $addToSet: { likes: { user_id: data.user_id } } })
                        .exec()
                        .catch(function (e) {
                        console.log(e);
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (isLiked)
                    return [2 /*return*/, res.send({ liked: false })];
                return [2 /*return*/, res.send({ liked: true })];
        }
    });
}); };
exports.likePost = likePost;
var commentOnPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, post, response, parentObjectID, subcomment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                return [4 /*yield*/, postSchema_1.Post.findOne({ _id: data.postId }).exec()];
            case 1:
                post = _a.sent();
                if (!data.user_id)
                    return [2 /*return*/];
                if (!(post && !data.isSub)) return [3 /*break*/, 3];
                return [4 /*yield*/, postSchema_1.Post.findOneAndUpdate({ _id: data.postId }, {
                        $push: {
                            comments: {
                                comment: data.comment,
                                comment_id: (0, nanoid_1.nanoid)(),
                                username: data.username,
                                user_id: data.user_id,
                            },
                        },
                    })
                        .exec()
                        .catch(function (e) {
                        console.log(e);
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                if (!(post && data.isSub)) return [3 /*break*/, 5];
                parentObjectID = new mongoose_1.default.Types.ObjectId(data.parentCommentId);
                subcomment = {
                    comment: data.comment,
                    username: data.username,
                    user_id: data.user_id,
                };
                console.log(subcomment);
                return [4 /*yield*/, postSchema_1.Post.findOneAndUpdate({
                        _id: data.postId,
                        "comments._id": parentObjectID,
                    }, { $push: { "comments.$.subcomment": subcomment } })
                        .exec()
                        .catch(function (e) {
                        console.log(e);
                    })];
            case 4:
                response = _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/, res.send(response)];
        }
    });
}); };
exports.commentOnPost = commentOnPost;
