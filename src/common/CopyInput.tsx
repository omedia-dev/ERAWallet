import React, {Component} from "react";
import {Clipboard, Image, TextInput, TouchableOpacity, View} from "react-native";
import {ImageResources} from "./ImageRecources.g";
import {styles, textPlaceholderColor} from "../styles";
import {Toaster} from "./Toaster";
import {f} from "./t";

export class CopyInput extends Component<ICopyInputProps, ICopyInputState> {
    private copy = () => {
        Clipboard.setString(this.props.textToCopy || this.props.text);
        Toaster.error(f`Copied to clipboard`);
    };

    constructor(props: ICopyInputProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <View>
                <TextInput
                    placeholderTextColor={textPlaceholderColor}
                    style={styles.register.textInput}
                    underlineColorAndroid={"transparent"}
                    value={this.props.text}
                    editable={false}
                />
                <TouchableOpacity onPress={this.copy} style={styles.register.button}>
                    <Image style={styles.sent.image} source={ImageResources.icon_copy_gray}/>
                </TouchableOpacity>
            </View>
        );
    }
}

interface ICopyInputProps {
    text: string;
    textToCopy?: string;
}

interface ICopyInputState {

}
