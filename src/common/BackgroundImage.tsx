import React, {Component} from "react";
import {Image, ImageStyle, ImageURISource} from "react-native";
import {styles} from "../styles";

export class BackgroundImage extends Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <Image
                source={this.props.source}
                style={{...styles.backgroundImage, ...(this.props.customStyle ? this.props.customStyle : {resizeMode: "cover"})}}
            >
                {this.props.children}
            </Image>
        );
    }
}

interface IProps {
    source: ImageURISource;
    customStyle?: ImageStyle;
}
