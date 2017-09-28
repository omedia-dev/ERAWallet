import React, {Component} from "react";
import {observer} from "mobx-react/native";
import {styles} from "../styles";
import {ImageResources} from "./ImageRecources.g";
import {Image} from "react-native";
import {stores} from "../core/stores/Stores";

@observer
export class TopNavImg extends Component<ITopNavImgProps, ITopNavImgState> {
    constructor(props: ITopNavImgProps) {
        super(props);
    }

    render(): JSX.Element {
        const style = {
            ...styles.shared.topBackgroundImage,
            height: (stores.topNavImgStore.height || 0) + 64
        };

        return (<Image resizeMode={"cover"} source={ImageResources.image} style={style}/> );
    }
}

interface ITopNavImgProps {

}

interface ITopNavImgState {

}
