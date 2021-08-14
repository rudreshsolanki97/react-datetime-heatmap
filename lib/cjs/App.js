"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var heatmap_1 = require("./heatmap");
var faker_1 = __importDefault(require("faker"));
function App() {
    var data = [];
    for (var i = 0; i < 200; i++) {
        data.push({
            date: faker_1.default.date.between("2021-08-01", "2021-12-31"),
            value: faker_1.default.datatype.number({ min: 0, max: 10000 }),
        });
    }
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement(heatmap_1.HeatMap, { data: data, valueLabel: "SRX", highlighColor: "orange", from: new Date("2021-08-01"), to: new Date("2022-08-01") })));
}
exports.default = App;
