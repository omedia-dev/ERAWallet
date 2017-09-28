import React, {Component} from "react";
import {ActivityIndicator, View, ViewStyle} from "react-native";
import {AlignItems, JustifyContent, Positions} from "../types/RNStyles";
import {dHeight, dWidth} from "../styles";

export class Loading extends Component<ILoadingProps, ILoadingState> {
    constructor(props: ILoadingProps) {
        super(props);

        this.state = {loading: false};
    }

    componentWillReceiveProps(nextProps: Readonly<ILoadingProps>, nextContext: any): void {
        this.setState({loading: nextProps.state});
    }

    render(): JSX.Element {
        if (this.state.loading) {
            return ( <View style={styles}><ActivityIndicator animating={true} color={"#fff"} size={"large"}/></View> );
        } else {
            return ( <View/> );
        }
    }
}

const styles = {
    position: Positions.absolute,
    top: 0,
    left: 0,
    width: dWidth,
    height: dHeight,
    backgroundColor: "rgba(87,99,115,0.40)",
    alignItems: AlignItems.center,
    justifyContent: JustifyContent.center,
    zIndex: 1
}  as ViewStyle;

interface ILoadingProps {
    state?: boolean;
}

interface ILoadingState {
    loading?: boolean;
}
