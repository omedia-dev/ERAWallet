/* tslint:disable:max-classes-per-file */

import {Dimensions} from "react-native";

const dWidth = Dimensions.get("window").width;

export class Positions {
    static relative: PositionValues = "relative";
    static absolute: PositionValues = "absolute";
}

export class AlignItems {
    static flexStart: AlignItemsValues = "flex-start";
    static flexEnd: AlignItemsValues = "flex-end";
    static center: AlignItemsValues = "center";
    static stretch: AlignItemsValues = "stretch";
    static baseline: AlignItemsValues = "baseline";
}

export class JustifyContent {
    static flexStart: JustifyContentValues = "flex-start";
    static flexEnd: JustifyContentValues = "flex-end";
    static center: JustifyContentValues = "center";
    static spaceBetween: JustifyContentValues = "space-between";
    static spaceAround: JustifyContentValues = "space-around";
}

export class FlexDirection {
    static row: FlexDirectionValues = "row";
    static column: FlexDirectionValues = "column";
    static rowReverse: FlexDirectionValues = "row-reverse";
    static columnReverse: FlexDirectionValues = "column-reverse";
}

export class TextAlign {
    static center: TextAlignValues = "center";
    static left: TextAlignValues = "left";
    static right: TextAlignValues = "right";
}

export class Overflow {
    static visible: OverflowValues = "visible";
    static hidden: OverflowValues = "hidden";
}

type AlignItemsValues = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
type TextAlignValues = "auto" | "left" | "right" | "center";
type PositionValues = "absolute" | "relative";
type FlexDirectionValues = "row" | "column" | "row-reverse" | "column-reverse";
type JustifyContentValues = "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
type OverflowValues = "visible" | "hidden";

export function scaleToDevice(imageSize: { width: number, height: number }): { width: number, height: number } {
    return {height: (dWidth * imageSize.height) / imageSize.width, width: dWidth};
}
