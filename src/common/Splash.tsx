import React, {Component} from "react";
import {Image} from "react-native";
import {ImageResources} from "./ImageRecources.g";
import {dHeight, dWidth} from "../styles";

export class Splash extends Component<ISplashProps, ISplashState> {
    constructor(props: ISplashProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <Image source={ImageResources.splash_screen} style={{flex: 1, width:dWidth, height: dHeight}}/>
        );
    }
}

interface ISplashProps {

}

interface ISplashState {

}
