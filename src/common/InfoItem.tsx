import React, {Component} from "react";
import {Animated, Clipboard, Image, TouchableOpacity, View} from "react-native";
import {styles} from "../styles";
import {ImageResources} from "./ImageRecources.g";
import Toast from "react-native-simple-toast";
import {f} from "./t";
import Text = Animated.Text;

// const dWidth = Dimensions.get("window").width;
interface IInfoProps {
    title: string;
    value: string;
    onPress?: () => void;
}

interface IInfoState {
}

export class InfoItem extends Component<IInfoProps, IInfoState> {
    private copyToClipboard = () => {

        if (this.props.onPress) {
            this.props.onPress();
        } else {
            try {
                Clipboard.setString(this.props.value);
                Toast.show(f`Copied to clipboard`);
            } catch (error) {
            }
        }
    };

    render(): JSX.Element {
        return (
            <View style={styles.infoItem.container}>
                <Text style={styles.infoItem.title}>{this.props.title}</Text>
                <View style={styles.infoItem.valueContainer}>
                    <Text
                        multiline={false}
                        numberOfLines={1}
                        style={styles.infoItem.value}
                    >
                        {this.props.value}
                    </Text>
                    <TouchableOpacity style={styles.infoItem.button} onPress={this.copyToClipboard}>
                        <Image style={styles.infoItem.button} source={ImageResources.icon_copy}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
