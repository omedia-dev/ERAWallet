import React, {Component} from "react";
import {Text, TextStyle, View, ViewStyle} from "react-native";
import {AlignItems, JustifyContent} from "../types/RNStyles";
import {FontNames} from "../common/FontNames";
import {textPlaceholderColor} from "../styles";
import {f} from "../common/t";

export class NothingFound extends Component<INothingFoundProps, INothingFoundState> {
    constructor(props: INothingFoundProps) {
        super(props);
    }

    render(): JSX.Element {
        const message = this.props.message || f`Sorry not found`;
        return (
            <View style={styles.container}><Text style={styles.text}>{message}</Text></View>
        );
    }
}

const styles = {
    container: {
        marginTop: 16,
        alignItems: AlignItems.flexStart,
        justifyContent: JustifyContent.flexStart,
    } as ViewStyle,
    text: {
        fontFamily: FontNames.ProstoLight,
        fontSize: 16,
        color: textPlaceholderColor,
        lineHeight: 18
    } as TextStyle,
};

interface INothingFoundProps {
    message?: string;
}

interface INothingFoundState {

}
