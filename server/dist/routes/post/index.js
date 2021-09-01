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
exports.PostRouter = void 0;
var express_1 = __importDefault(require("express"));
var postSchema_1 = __importDefault(require("../../models/postSchema"));
var multer_1 = __importDefault(require("multer"));
var imgbb_1 = __importDefault(require("imgbb"));
var fs = require("fs").promises;
var router = express_1.default.Router();
exports.PostRouter = router;
// GET ALL POSTS
router.get("/api/posts", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allPosts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, postSchema_1.default.find().sort({ date: "desc" })];
            case 1:
                allPosts = _a.sent();
                return [2 /*return*/, res.send(allPosts)];
        }
    });
}); });
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/temp");
    },
    filename: function (req, file, cb) {
        var name = file === null || file === void 0 ? void 0 : file.originalname;
        cb(null, name);
    },
});
var upload = multer_1.default({ storage: storage });
var key = "a1e4a333e66c1b8d5163332ba42cd473";
// CREATE A POST
router.post("/api/post/create/customimg", upload.single("image"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, file, image, date, name, api, bbres, _a, _b, imageUrl, response, err_1;
    var _c;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                body = req.body;
                file = req.file;
                console.log(body);
                console.log(file);
                return [4 /*yield*/, fs.readFile(file.path, { encoding: "base64" })];
            case 1:
                image = _f.sent();
                date = Date.now();
                name = body.username + "_" + date;
                api = new imgbb_1.default({
                    token: key,
                });
                _b = (_a = api)
                    .upload;
                _c = {
                    name: name
                };
                return [4 /*yield*/, fs.readFile(file.path)];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_c.image = _f.sent(),
                        _c)])
                    .catch(function (e) { return console.log(e); })];
            case 3:
                bbres = _f.sent();
                imageUrl = (_e = (_d = bbres.data) === null || _d === void 0 ? void 0 : _d.image) === null || _e === void 0 ? void 0 : _e.url;
                console.log(imageUrl);
                _f.label = 4;
            case 4:
                _f.trys.push([4, 6, , 7]);
                return [4 /*yield*/, postSchema_1.default.create({
                        username: body.username,
                        text: body.text,
                        image: imageUrl,
                        date: date,
                    })];
            case 5:
                response = _f.sent();
                return [3 /*break*/, 7];
            case 6:
                err_1 = _f.sent();
                console.log(err_1);
                return [3 /*break*/, 7];
            case 7:
                if (response)
                    return [2 /*return*/, res.send({ success: true })];
                else
                    return [2 /*return*/, res.send({ success: false })];
                return [2 /*return*/];
        }
    });
}); });
router.post("/api/post/create/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, postSchema_1.default.create(req.body)];
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
}); });
router.post("/api/post/like", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                return [4 /*yield*/, postSchema_1.default.find({ _id: data.postId })];
            case 1:
                post = _a.sent();
                console.log(post);
                console.log(data);
                return [2 /*return*/];
        }
    });
}); });