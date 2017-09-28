import React, {Component} from "react";
import {Text, TextStyle, View, ViewStyle} from "react-native";
import {AlignItems, JustifyContent} from "../types/RNStyles";
import {FontNames} from "../common/FontNames";
import {dWidth, styles, textBorderColor} from "../styles";
import {f} from "./t";

export class EmptyFavorites extends Component<INothingFoundProps, INothingFoundState> {
    constructor(props: INothingFoundProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <View style={stylesLocal.container}>
                <Text style={stylesLocal.text}>{this.props.message ? this.props.message : f`Favorite is empty`}</Text>
                <View style={{...styles.shared.line, ...{width: dWidth}}}/>
            </View>
        );
    }
}

const stylesLocal = {
    container: {
        marginVertical: 8,
        alignItems: AlignItems.flexStart,
        justifyContent: JustifyContent.flexStart,
    } as ViewStyle,
    text: {
        fontFamily: FontNames.ProstoLight,
        fontSize: 16,
        color: textBorderColor,
        lineHeight: 18,
        marginBottom: 24,
    } as TextStyle,
};

interface INothingFoundProps {
    message?: string;
}

interface INothingFoundState {

}
