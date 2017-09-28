import React, {Component} from "react";
import {Image, TouchableOpacity} from "react-native";
import {styles} from "../styles";
import {Positions} from "../types/RNStyles";
import {ImageResources} from "./ImageRecources.g";

export class BackBtn extends Component<IBackBtnProps, IBackBtnState> {
    render(): JSX.Element {

        const style = {...styles.backBtn.container, ...(this.props.float ? {position: Positions.absolute} : {})};
        return (
            <TouchableOpacity
                style={style}
                onPress={this.props.onPress}
            >
                <Image source={ImageResources.icon_back} style={styles.backBtn.icon}/>
            </TouchableOpacity>
        );
    }
}

interface IBackBtnProps extends INavigationProps {
    float: boolean;
    onPress?: () => void;
}

interface IBackBtnState {

}
