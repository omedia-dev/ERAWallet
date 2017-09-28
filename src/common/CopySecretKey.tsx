import React, {Component} from "react";
import {Animated, Clipboard, Image, TextInput, TouchableOpacity, View} from "react-native";
import {styles, textPlaceholderColor} from "../styles";
import {Toaster} from "./Toaster";
import {f} from "./t";
import {stores} from "../core/stores/Stores";
import {ImageResources} from "./ImageRecources.g";
import {Btn} from "./Btn/Btn";
import {PrivateKeyAccount} from "../core/src/core/account/PrivateKeyAccount";
import Toast from "react-native-simple-toast";
import Text = Animated.Text;

export class CopySecretKey extends Component<ICopySecretKeyProps, ICopySecretKeyState> {
    private copyToClipboard = () => {
        Clipboard.setString(this.state.key);
        Toaster.error(f`Copied to clipboard`);
    };
    private pasteFromClipboard = async () => {
        const content = await
            Clipboard.getString();
        const valid = await
            PrivateKeyAccount.validate(content);
        this.setState({copiedKey: content, validKey: valid});
        Toast.show(f`Copied from clipboard`);
        this.props.onComplete(content.localeCompare(this.state.key) === 0);
    };

    constructor(props: ICopySecretKeyProps) {
        super(props);

        this.state = {copiedKey: "", key: "", validKey: false};
    }

    async componentWillMount(): Promise<void> {
        const keys = await stores.localWallet.keys.toString();
        this.setState({key: keys.secretKey});
    }

    render(): JSX.Element {
        return (
            <View>
                <View style={{marginHorizontal: 16}}>
                    <Btn onPress={this.copyToClipboard} title={f`Copy to clipboard`} fill={true}/>
                </View>
                <View>
                    <Text style={styles.register.completeBigMessage}>{f`message_4`}</Text>
                </View>
                <View style={{marginHorizontal: 16}}>
                    <TextInput
                        placeholderTextColor={textPlaceholderColor}
                        style={styles.register.textInput}
                        underlineColorAndroid={"transparent"}
                        value={this.state.copiedKey.slice(0, 10) + "..."}
                        editable={false}
                    />
                    <TouchableOpacity activeOpacity={0.9} onPress={this.pasteFromClipboard}
                                      style={styles.register.button1}>
                        <Image style={{width: 28, height: 30}}
                               source={ImageResources.icon_insert}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

interface ICopySecretKeyProps {
    onComplete: (saved: boolean) => void;
}

interface ICopySecretKeyState {
    key: string;
    copiedKey: string;
    validKey: boolean;
}
