# React Datetime Heatmap

Create heatmaps for a time-series data.

![Main Image](https://raw.githubusercontent.com/rudreshsolanki97/react-datetime-heatmap/master/assets/example.png)

## Installation

React-Datetime-Heatmap can installed in your react project by running the following command:

`npm i react-datetime-heatmap`


## Usage 

```

import React from "react";
import { HeatMap } from "./heatmap";
import faker from "faker";

function App() {

  // TEST data


  let data: Array<{
    date: Date;
    value: number;
  }> = [];
  for (let i = 0; i < 200; i++) {
    data.push({
      date: faker.date.between("2021-08-01", "2021-12-31"),
      value: faker.datatype.number({ min: 0, max: 10000 }),
    });
  }

  return (
    <div className="App">
      <HeatMap
        data={data}
        valueLabel="SRX"
        highlighColor="orange"
        from={new Date("2021-08-01")}
        to={new Date("2022-08-01")}
      />
    </div>
  );
}

export default App;


```

Heatmap Interface

```
interface HeatMapProp {
  data: Array<{
    date: Date;
    value: number;
  }>;
  highlighColor?: string;
  from?: Date;
  to?: Date;
  valueLabel?: string;
  onSelect?: (date: Date) => void;
  enableStep?: boolean;
  stepSize?: number;
}

```

