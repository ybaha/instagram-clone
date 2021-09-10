"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var post_1 = require("./routes/post");
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var pw_1 = require("./pw");
var user_1 = require("./routes/user");
exports.port = process.env.PORT || 5000;
var app = (0, express_1.default)();
var mongooseURL = "mongodb+srv://baha:" + pw_1.pw + "@cluster0.x0mow.mongodb.net/istekram";
if (process.env.NODE_ENV === "dev")
    mongooseURL = "mongodb://localhost/istekram";
else
    console.log = function () { };
console.log(mongooseURL);
console.log(process.env.NODE_ENV);
mongoose_1.default.connect(mongooseURL);
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use(express_1.default.json());
app.use(post_1.PostRouter);
app.use(user_1.UserRouter);
app.use(express_1.default.static("public"));
app.listen(exports.port, function () {
    console.log("Server is up and runnning!");
});
