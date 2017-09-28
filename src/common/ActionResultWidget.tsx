import React, {Component} from "react";
import {Image, ImageStyle, Text, TextStyle, View, ViewStyle} from "react-native";
import {styles, textPlaceholderColor, transparentColor} from "../styles";
import {ImageResources} from "./ImageRecources.g";
import {NavigationBar} from "./NavigationBar";
import {AlignItems, JustifyContent} from "../types/RNStyles";
import {f} from "./t";
import {FontNames} from "./FontNames";
import {FooterBtn} from "./FooterBtn";

export class ActionResultWidget extends Component<IActionResultWidgetProps, IActionResultWidgetState> {
    private touches: number = 0;
    private countDebug = () => {
        this.touches++;
        if (this.touches >= 5) {
            this.setState({debug: true});
        }
    };

    constructor(props: IActionResultWidgetProps, context: any) {
        super(props, context);

        this.state = {debug: false};
    }

    render(): JSX.Element {
        const source = this.props.success ? ImageResources.image_succes : ImageResources.image_no_transaction;
        const debugData = this.props.debugData;

        return (
            <View style={styles.container}>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar title={""}/>

                <View style={styles.container}>
                    <View style={style.container} onTouchEnd={this.countDebug}>
                        <Image style={style.image} source={source}/>
                        <Text style={style.text}>{this.props.message}</Text>
                    </View>

                    {this.state.debug ? <Text style={{paddingHorizontal: 10}}>{debugData}</Text> : null}
                    <View style={style.footer}>
                        <FooterBtn onPress={this.props.onContinue} title={f`Continue`}/>
                    </View>
                </View>
            </View>
        );
    }
}

const style = {
    container: {
        paddingTop: 77,
        alignItems: AlignItems.center,
        justifyContent: JustifyContent.flexEnd,
        paddingHorizontal: 16
    } as ViewStyle,
    image: {width: 80, height: 80} as ImageStyle,
    text: {
        color: textPlaceholderColor,
        backgroundColor: transparentColor,
        fontFamily: FontNames.ProstoRegular,
        fontSize: 20,
        lineHeight: 26,
        marginTop: 32,
        textAlign: "center"
    } as TextStyle,
    footer: {
        flex: 1,
        alignItems: AlignItems.center,
        justifyContent: JustifyContent.flexEnd
    } as ViewStyle
};

interface IActionResultWidgetProps {
    onContinue: () => void;
    success: boolean;
    message: string;
    debugData?: string;
}

interface IActionResultWidgetState {
    debug: boolean;
}
