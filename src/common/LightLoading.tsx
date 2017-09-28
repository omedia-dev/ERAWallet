import React, {Component} from "react";
import {Text, TextStyle, View, ViewStyle} from "react-native";
import {AlignItems, JustifyContent, Positions} from "../types/RNStyles";
import {backgroundGray, dWidth, textPlaceholderColor} from "../styles";
import {FontNames} from "./FontNames";
import * as _ from "lodash";
import {f} from "./t";

export class LightLoading extends Component<ILightLoadingProps, ILightLoadingState> {
    private timeout: number;

    constructor(props: ILightLoadingProps) {
        super(props);
    }

    componentWillMount(): void {
        this.state = {show: false};
        this.timeout = _.delay(() => {
            this.setState({show: true});
        }, 300);
    }

    componentWillUnmount(): void {
        clearTimeout(this.timeout);
    }

    render(): JSX.Element {
        return this.state.show ? (
            <View style={styles.container}>
                <Text style={styles.text} numberOfLines={1} ellipsizeMode={"tail"}>{f`Searching, wait`}</Text>
            </View>
        ) : <View/>;
    }
}

const styles = {
    container: {
        backgroundColor: backgroundGray,
        height: 60,
        justifyContent: JustifyContent.center,
        alignItems: AlignItems.center,
        position: Positions.absolute,
        bottom: 0,
        width: dWidth
    } as ViewStyle,
    text: {
        fontFamily: FontNames.ProstoLight,
        color: textPlaceholderColor,
        fontSize: 16
    } as TextStyle,
};

interface ILightLoadingProps {
}

interface ILightLoadingState {
    show: boolean;
}
