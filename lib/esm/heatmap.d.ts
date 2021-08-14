import React from "react";
import "./main.css";
export interface MonthProp {
    year: number;
    month: number;
    data: {
        [k: string]: HeatMapNodeData;
    };
    highlightColor: string;
    valueLabel?: string;
}
export declare class Month extends React.Component<MonthProp> {
    constructor(props: MonthProp);
    render(): JSX.Element;
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
}
export declare const DayLabel: () => JSX.Element;
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
export declare class HeatMap extends React.Component<HeatMapProp> {
    constructor(props: HeatMapProp);
    fillData(data: HeadMapData, { from, to, max }: {
        from: Date;
        to: Date;
        max: number;
    }): HeadMapData;
    render(): JSX.Element;
}
export {};
