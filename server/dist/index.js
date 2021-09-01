"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var routes_1 = require("./routes");
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var pw_1 = require("./pw");
var port = process.env.PORT || 5000;
var app = express_1.default();
var mongooseURL = "mongodb+srv://baha:" + pw_1.pw + "@cluster0.x0mow.mongodb.net/istekram";
// "mongodb://localhost/istekram";
console.log(mongooseURL);
console.log(process.env.NODE_ENV);
mongoose_1.default.connect(mongooseURL);
app.use(cors_1.default());
app.use(body_parser_1.json());
app.use(express_1.default.json());
app.use(routes_1.router);
app.listen(port, function () {
    console.log("Server is up and runnning!");
});
