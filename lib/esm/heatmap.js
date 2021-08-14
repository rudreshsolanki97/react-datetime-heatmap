var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import ReactTooltip from "react-tooltip";
import "./main.css";
var MonthToName = function (x) {
    var data = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEPT",
        "OCT",
        "NOV",
        "DEC",
    ];
    return data[x];
};
// const MonthDays = (x: number, year: number): number => {
//   switch (x) {
//     case 0:
//     case 2:
//     case 4:
//     case 6:
//     case 7:
//     case 9:
//     case 11:
//       return 31;
//     case 1:
//       return leapYear(year) ? 29 : 28;
//     default:
//       return 30;
//   }
// };
var ONE_DAY = 86400;
function StepFunction(x, stepSize) {
    return Math.round(x / stepSize) * stepSize;
}
function FormatDate(year, month, date, value) {
    return value + "; " + date + " " + MonthToName(month) + ", " + year;
}
var HeatBox = function (_a) {
    var _b = _a === void 0 ? {
        label: "",
        blank: false,
    } : _a, _c = _b.label, label = _c === void 0 ? "" : _c, _d = _b.blank, blank = _d === void 0 ? false : _d, _e = _b.className, className = _e === void 0 ? "" : _e, _f = _b.tooltip, tooltip = _f === void 0 ? "" : _f, _g = _b.opacity, opacity = _g === void 0 ? 70 : _g, _h = _b.highlightColor, highlightColor = _h === void 0 ? "gray" : _h;
    opacity = StepFunction(opacity, 20);
    if (!blank) {
        if (opacity === 0) {
            return (React.createElement("div", { "data-tip": tooltip, style: { backgroundColor: "lightgrey" }, className: "heatmap-box" + (" opacity-" + opacity + " ") + className }, label));
        }
        return (React.createElement("div", { "data-tip": tooltip, style: { backgroundColor: highlightColor }, className: "heatmap-box" + (" opacity-" + opacity + " ") + className }, label));
    }
    return (React.createElement("div", { "data-tip": tooltip, className: "heatmap-box blank" + " " + className }, label));
};
var Month = /** @class */ (function (_super) {
    __extends(Month, _super);
    function Month(props) {
        return _super.call(this, props) || this;
    }
    Month.prototype.render = function () {
        var _this = this;
        var monthStart = new Date();
        monthStart.setFullYear(this.props.year);
        monthStart.setMonth(this.props.month);
        monthStart.setDate(1);
        var day = monthStart.getDay();
        // let monthDayCount = MonthDays(this.props.month, this.props.year);
        monthStart.setDate(Object.keys(this.props.data).length);
        var lastDay = monthStart.getDay();
        var days = [];
        while (day > 0) {
            days.push(HeatBox({ blank: true }));
            day--;
        }
        Object.keys(this.props.data).forEach(function (x) {
            days.push(HeatBox({
                tooltip: "" + FormatDate(_this.props.year, _this.props.month, parseInt(x), _this.props.data[x].value + " " + (_this.props.valueLabel || "units")),
                highlightColor: _this.props.highlightColor,
                opacity: parseInt(_this.props.data[x].relativePercent.toFixed(0)),
            }));
        });
        while (lastDay < 6) {
            days.push(HeatBox({ blank: true }));
            lastDay++;
        }
        var cols = Math.ceil(days.length / 7);
        return (React.createElement("div", { className: "month-wrapper mon-" + cols },
            React.createElement("div", { className: "month-title" }, MonthToName(this.props.month)),
            React.createElement("div", { className: "month" }, days)));
    };
    return Month;
}(React.Component));
export { Month };
export var DayLabel = function () { return (React.createElement("div", { className: "day-label" },
    React.createElement(HeatBox, { tooltip: "test", className: "no-bg", blank: true, label: "S" }),
    React.createElement(HeatBox, { className: "no-bg ", blank: true, label: "M" }),
    React.createElement(HeatBox, { className: "no-bg", blank: true, label: "T" }),
    React.createElement(HeatBox, { className: "no-bg", blank: true, label: "W" }),
    React.createElement(HeatBox, { className: "no-bg", blank: true, label: "T" }),
    React.createElement(HeatBox, { className: "no-bg", blank: true, label: "F" }),
    React.createElement(HeatBox, { className: "no-bg", blank: true, label: "S" }))); };
var RenderHeatMap = /** @class */ (function (_super) {
    __extends(RenderHeatMap, _super);
    function RenderHeatMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RenderHeatMap.prototype.render = function () {
        var _this = this;
        var data = [];
        Object.keys(this.props.data).forEach(function (year) {
            Object.keys(_this.props.data[year]).forEach(function (month) {
                data.push(React.createElement(Month, { data: _this.props.data[year][month], month: parseInt(month), year: parseInt(year), highlightColor: _this.props.highlightColor, valueLabel: _this.props.valueLabel }));
            });
        });
        return data;
    };
    return RenderHeatMap;
}(React.Component));
var HeatMap = /** @class */ (function (_super) {
    __extends(HeatMap, _super);
    function HeatMap(props) {
        return _super.call(this, props) || this;
    }
    HeatMap.prototype.fillData = function (data, _a) {
        var from = _a.from, to = _a.to, max = _a.max;
        var fromTime = from.getTime(), toTime = to.getTime();
        for (var i = fromTime; i <= toTime; i += ONE_DAY) {
            var date = new Date(i);
            var month = date.getMonth(), year = date.getFullYear(), day = date.getDate();
            if (!data["" + year])
                data["" + year] = {};
            if (!data["" + year])
                data["" + year] = {};
            if (!data["" + year]["" + month])
                data["" + year]["" + month] = {};
            if (!data["" + year]["" + month]["" + day])
                data["" + year]["" + month]["" + day] = {
                    value: 0,
                    entries: [],
                    relativePercent: 0,
                };
            else
                data["" + year]["" + month]["" + day] = __assign(__assign({}, data["" + year]["" + month]["" + day]), { relativePercent: 100 * (data["" + year]["" + month]["" + day].value / max) });
        }
        return data;
    };
    HeatMap.prototype.render = function () {
        var data = this.props.data;
        var max = 0;
        var parsedData = data.reduce(function (acc, cur) {
            var date = cur.date;
            var month = date.getMonth();
            var year = date.getFullYear();
            var day = date.getDate();
            if (!acc["" + year])
                acc["" + year] = {};
            if (!acc["" + year]["" + month])
                acc["" + year]["" + month] = {};
            if (!acc["" + year]["" + month]["" + day])
                acc["" + year]["" + month]["" + day] = {
                    value: 0,
                    entries: [],
                    relativePercent: 0,
                };
            acc["" + year]["" + month]["" + day].value += cur.value;
            acc["" + year]["" + month]["" + day].entries.push(cur);
            if (cur.value > max)
                max = cur.value;
            return acc;
        }, {});
        var from = new Date(), to = new Date();
        from.setDate(1);
        from.setMonth(0);
        to.setDate(31);
        to.setMonth(11);
        if (this.props.from) {
            from = this.props.from;
        }
        if (this.props.to) {
            to = this.props.to;
        }
        var filledData = this.fillData(parsedData, { from: from, to: to, max: max });
        var highlightColor = this.props.highlighColor || "green";
        return (React.createElement("div", { className: "heatmap" },
            React.createElement(ReactTooltip, null),
            React.createElement(DayLabel, null),
            React.createElement(RenderHeatMap, { valueLabel: this.props.valueLabel, highlightColor: highlightColor, data: filledData })));
    };
    return HeatMap;
}(React.Component));
export { HeatMap };
