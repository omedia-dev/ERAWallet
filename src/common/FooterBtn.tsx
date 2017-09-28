import React, {Component} from "react";
import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {AlignItems, FlexDirection, JustifyContent, Positions} from "../types/RNStyles";
import {dWidth, primaryColor3, whiteColor} from "../styles";
import {FontNames} from "./FontNames";

export class FooterBtn extends Component<IFooterBtnProps, IFooterBtnState> {
    constructor(props: IFooterBtnProps) {
        super(props);
    }

    render(): JSX.Element {
        const content = this.props.title ? <Text style={styles.text} numberOfLines={1}>{this.props.title}</Text> : this.props.children;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.onPress} style={styles.button} activeOpacity={0.9}>{content}</TouchableOpacity>
            </View>
        );
    }
}

const styles = {
    container: {
        position: Positions.absolute,
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: FlexDirection.row,
        alignItems: AlignItems.stretch,
        justifyContent: JustifyContent.center
    } as ViewStyle,
    button: {
        backgroundColor: primaryColor3,
        flexDirection: FlexDirection.row,
        flex: 1,
        alignItems: AlignItems.center,
        justifyContent: JustifyContent.center,
    } as ViewStyle,
    text: {
        color: whiteColor,
        fontFamily: FontNames.ProstoRegular,
        fontSize: 18,
        marginHorizontal: 10,
        lineHeight: 23,
         maxWidth: dWidth *.8
    } as TextStyle
};

interface IFooterBtnProps {
    title?: string;
    onPress?: () => void;
}

interface IFooterBtnState {

}
