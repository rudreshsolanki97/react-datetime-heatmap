import React from "react";
import ReactTooltip from "react-tooltip";

import "./main.css";

const MonthToName = (x: number): string => {
  const data = [
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

const ONE_DAY = 86400;

// function leapYear(year: number): boolean {
//   return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
// }

export interface MonthProp {
  year: number;
  month: number;
  data: { [k: string]: HeatMapNodeData };
  highlightColor: string;
  valueLabel?: string;
  onSelect?: (date: Date) => void;
}

function StepFunction(x: number, stepSize: number): number {
  return Math.round(x / stepSize) * stepSize;
}

export interface HeatMapProp {
  data: Array<{
    date: Date;
    value: number;
  }>;
  highlighColor?: string;
  from?: Date;
  to?: Date;
  valueLabel?: string;
  onSelect?: (date: Date) => void;
}

interface HeatMapNodeData {
  value: number;
  relativePercent: number;
  entries: Array<{
    date: Date;
    value: number;
  }>;
}

interface HeadMapData {
  [k: string]: {
    [k: string]: {
      [k: string]: HeatMapNodeData;
    };
  };
}

interface RenderHeatMapProps {
  data: HeadMapData;
  highlightColor: string;
  valueLabel?: string;
  onSelect?: (date: Date) => void;
}

function FormatDate(
  year: number,
  month: number,
  date: number,
  value: string
): string {
  return `${value}; ${date} ${MonthToName(month)}, ${year}`;
}

const HeatBox = (
  {
    label = "",
    blank = false,
    className = "",
    tooltip = "",
    opacity = 70,
    highlightColor = "gray",
    onSelect,
  }: {
    label?: string;
    blank?: boolean;
    opacity?: number;
    className?: string;
    tooltip?: string;
    highlightColor?: string;
    onSelect?: () => void;
  } = {
    label: "",
    blank: false,
  }
) => {
  opacity = StepFunction(opacity, 20);

  if (!blank) {
    if (opacity === 0) {
      return (
        <div
          data-tip={tooltip}
          style={{ backgroundColor: "lightgrey" }}
          className={"heatmap-box" + ` opacity-${opacity} ` + className}
          onClick={() => onSelect && onSelect()}
        >
          {label}
        </div>
      );
    }

    return (
      <div
        data-tip={tooltip}
        style={{ backgroundColor: highlightColor }}
        className={"heatmap-box" + ` opacity-${opacity} ` + className}
        onClick={() => onSelect && onSelect()}
      >
        {label}
      </div>
    );
  }

  return (
    <div data-tip={tooltip} className={"heatmap-box blank" + " " + className}>
      {label}
    </div>
  );
};

export class Month extends React.Component<MonthProp> {
  constructor(props: MonthProp) {
    super(props);
  }

  render() {
    const monthStart = new Date();

    monthStart.setFullYear(this.props.year);
    monthStart.setMonth(this.props.month);
    monthStart.setDate(1);

    let day = monthStart.getDay();
    // let monthDayCount = MonthDays(this.props.month, this.props.year);

    monthStart.setDate(Object.keys(this.props.data).length);

    let lastDay = monthStart.getDay();

    const days: Array<JSX.Element> = [];

    while (day > 0) {
      days.push(HeatBox({ blank: true }));
      day--;
    }

    Object.keys(this.props.data).forEach((x) => {
      days.push(
        HeatBox({
          tooltip: `${FormatDate(
            this.props.year,
            this.props.month,
            parseInt(x),
            `${this.props.data[x].value} ${this.props.valueLabel || "units"}`
          )}`,
          highlightColor: this.props.highlightColor,
          opacity: parseInt(this.props.data[x].relativePercent.toFixed(0)),
          onSelect: () =>
            this.props.onSelect &&
            this.props.onSelect(
              new Date(`${this.props.year}-${this.props.month + 1}-${x}`)
            ),
        })
      );
    });

    while (lastDay < 6) {
      days.push(HeatBox({ blank: true }));
      lastDay++;
    }

    const cols: number = Math.ceil(days.length / 7);

    return (
      <div className={`month-wrapper mon-${cols}`}>
        <div className="month-title">{MonthToName(this.props.month)}</div>
        <div className="month">{days}</div>
      </div>
    );
  }
}
export const DayLabel = () => (
  <div className="day-label">
    <HeatBox tooltip="test" className="no-bg" blank={true} label={"S"} />
    <HeatBox className="no-bg " blank={true} label={"M"} />
    <HeatBox className="no-bg" blank={true} label={"T"} />
    <HeatBox className="no-bg" blank={true} label={"W"} />
    <HeatBox className="no-bg" blank={true} label={"T"} />
    <HeatBox className="no-bg" blank={true} label={"F"} />
    <HeatBox className="no-bg" blank={true} label={"S"} />
  </div>
);

class RenderHeatMap extends React.Component<RenderHeatMapProps> {
  render() {
    let data: Array<JSX.Element> = [];
    Object.keys(this.props.data).forEach((year) => {
      Object.keys(this.props.data[year]).forEach((month) => {
        data.push(
          <Month
            data={this.props.data[year][month]}
            month={parseInt(month)}
            year={parseInt(year)}
            highlightColor={this.props.highlightColor}
            valueLabel={this.props.valueLabel}
            onSelect={this.props.onSelect}
          />
        );
      });
    });

    return data;
  }
}

export class HeatMap extends React.Component<HeatMapProp> {
  constructor(props: HeatMapProp) {
    super(props);
  }

  fillData(
    data: HeadMapData,
    { from, to, max }: { from: Date; to: Date; max: number }
  ): HeadMapData {
    let fromTime = from.getTime(),
      toTime = to.getTime();

    for (let i = fromTime; i <= toTime; i += ONE_DAY) {
      const date = new Date(i);
      const month = date.getMonth(),
        year = date.getFullYear(),
        day = date.getDate();

      if (!data[`${year}`]) data[`${year}`] = {};
      if (!data[`${year}`]) data[`${year}`] = {};
      if (!data[`${year}`][`${month}`]) data[`${year}`][`${month}`] = {};
      if (!data[`${year}`][`${month}`][`${day}`])
        data[`${year}`][`${month}`][`${day}`] = {
          value: 0,
          entries: [],
          relativePercent: 0,
        };
      else
        data[`${year}`][`${month}`][`${day}`] = {
          ...data[`${year}`][`${month}`][`${day}`],
          relativePercent:
            100 * (data[`${year}`][`${month}`][`${day}`].value / max),
        };
    }

    return data;
  }

  render() {
    const data = this.props.data;
    let max = 0;

    const parsedData = data.reduce<HeadMapData>((acc, cur) => {
      const date = cur.date;
      const month = date.getMonth();
      const year = date.getFullYear();
      const day = date.getDate();

      if (!acc[`${year}`]) acc[`${year}`] = {};
      if (!acc[`${year}`][`${month}`]) acc[`${year}`][`${month}`] = {};
      if (!acc[`${year}`][`${month}`][`${day}`])
        acc[`${year}`][`${month}`][`${day}`] = {
          value: 0,
          entries: [],
          relativePercent: 0,
        };

      acc[`${year}`][`${month}`][`${day}`].value += cur.value;
      acc[`${year}`][`${month}`][`${day}`].entries.push(cur);

      if (cur.value > max) max = cur.value;

      return acc;
    }, {});

    let from = new Date(),
      to = new Date();

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

    const filledData = this.fillData(parsedData, { from, to, max });

    const highlightColor = this.props.highlighColor || "green";

    return (
      <div className="heatmap">
        <ReactTooltip />

        <DayLabel />
        <RenderHeatMap
          onSelect={this.props.onSelect}
          valueLabel={this.props.valueLabel}
          highlightColor={highlightColor}
          data={filledData}
        />
      </div>
    );
  }
}
