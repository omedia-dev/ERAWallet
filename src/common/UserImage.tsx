import React, {Component} from "react";
import {Image, ImageURISource, View} from "react-native";
import {ImageResources} from "./ImageRecources.g";
import {styles} from "../styles";

export class UserImage extends Component<IUserImageProps, IUserImageState> {
    render(): JSX.Element {
        const source = this.props.source ? this.props.source : ImageResources.no_avatar;

        return (
            <View style={styles.userImage.container}>
                <Image source={source} style={styles.userImage.image} resizeMethod={"scale"}/>
            </View>
        );
    }
}

interface IUserImageProps {
    source: ImageURISource | null;
}

interface IUserImageState {

}
