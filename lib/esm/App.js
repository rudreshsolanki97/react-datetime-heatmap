import React from "react";
import { HeatMap } from "./heatmap";
import faker from "faker";
function App() {
    var data = [];
    for (var i = 0; i < 200; i++) {
        data.push({
            date: faker.date.between("2021-08-01", "2021-12-31"),
            value: faker.datatype.number({ min: 0, max: 10000 }),
        });
    }
    return (React.createElement("div", { className: "App" },
        React.createElement(HeatMap, { data: data, valueLabel: "SRX", highlighColor: "orange", from: new Date("2021-08-01"), to: new Date("2022-08-01"), onSelect: function (date) {
                console.log("selected heatmap", date);
            } })));
}
export default App;
