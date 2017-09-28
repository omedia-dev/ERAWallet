import React, {Component} from "react";
import {Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import {BtnStyles} from "./styles";

export class Btn extends Component<IBtnProps, IBtnState> {
    render(): JSX.Element {
        let textStyle = {...BtnStyles.text, ...(this.props.customTextStyles || {})};
        let btnStyle = {...BtnStyles.container, ...(this.props.customBtnStyles || {})};
        if (this.props.fill) {
            textStyle = {...textStyle, ...BtnStyles.textFill};
            btnStyle = {...btnStyle, ...BtnStyles.containerFill};
            if (this.props.fillColor) {
                btnStyle = {...btnStyle, backgroundColor: this.props.fillColor};
            }
        }
        if (this.props.link) {
            textStyle = {...textStyle, ...BtnStyles.textLink};
            btnStyle = {...btnStyle, ...BtnStyles.containerLink};
        }

        const inner = this.props.children || <Text numberOfLines={1} style={textStyle}>{this.props.title}</Text>;

        return (
            <TouchableOpacity disabled={this.props.disabled === true} onPress={this.props.onPress}
                              style={btnStyle}>{inner}</TouchableOpacity>
        );
    }
}

interface IBtnProps {
    fill?: boolean;
    fillColor?: string;
    disabled?: boolean;
    link?: boolean;
    title?: string;
    onPress?: () => void;
    customBtnStyles?: ViewStyle;
    customTextStyles?: TextStyle;
}

interface IBtnState {

}
