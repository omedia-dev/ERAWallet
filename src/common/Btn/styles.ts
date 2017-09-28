/* tslint:disable no-object-literal-type-assertion */

import {secondaryColor, textBorderColor, textPlaceholderColor} from "../../styles";
import {AlignItems, FlexDirection, JustifyContent} from "../../types/RNStyles";
import {TextStyle, ViewStyle} from "react-native";
import {FontNames} from "../FontNames";

export const BtnStyles = {
    container: {
        borderColor: textBorderColor,
        borderWidth: 1,
        borderRadius: 4,
        height: 47,
        paddingHorizontal: 16,
        alignItems: AlignItems.center,
        justifyContent: JustifyContent.center,
        flexDirection: FlexDirection.row,
    } as ViewStyle,
    containerFill: {
        backgroundColor: secondaryColor,
        borderWidth: 0,
    } as ViewStyle,
    text: {
        fontFamily: FontNames.ProstoLight,
        fontSize: 16,
        color: textPlaceholderColor,
        lineHeight: 21,
        textAlignVertical: "center",
        textAlign: "center",
    } as TextStyle,
    textFill: {
        color: "#fff"
    } as TextStyle,
    textLink: {
        color: secondaryColor,
        borderBottomColor: secondaryColor,
        borderBottomWidth: 1,
    } as TextStyle,
    containerLink: {
        paddingHorizontal: 0,
        backgroundColor: "transparent",
        borderWidth: 0,
    } as ViewStyle,
};
