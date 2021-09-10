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
exports.u = exports.uploadPhoto = void 0;
var multer_1 = __importDefault(require("multer"));
var imgbb_1 = __importDefault(require("imgbb"));
var fs_1 = require("fs");
var readFile = fs_1.promises.readFile;
var key = "a1e4a333e66c1b8d5163332ba42cd473";
var uploadPhoto = function (username, filePath, date) { return __awaiter(void 0, void 0, void 0, function () {
    var name, api, bbres, _a, _b, imageUrl;
    var _c;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                name = username + "_" + date;
                api = new imgbb_1.default({
                    token: key,
                });
                _b = (_a = api)
                    .upload;
                _c = {
                    name: name
                };
                return [4 /*yield*/, readFile(filePath)];
            case 1: return [4 /*yield*/, _b.apply(_a, [(_c.image = _f.sent(),
                        _c)])
                    .catch(function (e) { return console.log(e); })];
            case 2:
                bbres = _f.sent();
                imageUrl = (_e = (_d = bbres.data) === null || _d === void 0 ? void 0 : _d.image) === null || _e === void 0 ? void 0 : _e.url;
                return [2 /*return*/, imageUrl];
        }
    });
}); };
exports.uploadPhoto = uploadPhoto;
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/temp");
    },
    filename: function (req, file, cb) {
        var name = file === null || file === void 0 ? void 0 : file.originalname;
        cb(null, name);
    },
});
exports.u = (0, multer_1.default)({ storage: storage });
