import React, {Component} from "react";
import {Image, View} from "react-native";
import {styles} from "../styles";
import {ImageResources} from "./ImageRecources.g";

export class LargeLogo extends Component<ILargeLogoProps, ILargeLogoState> {
    render(): JSX.Element {
        return (
            <View style={styles.login.largeLogo}>
                <Image source={ImageResources.image} style={styles.login.largeLogoBackgroundImage}>
                    <Image style={styles.login.logo} source={ImageResources.logo}/>
                    {this.props.children}
                </Image>
            </View>
        );
    }
}

interface ILargeLogoProps {

}

interface ILargeLogoState {

}
