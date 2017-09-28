import React, {Component} from "react";
import {Text, TextInput, View} from "react-native";
import {styles} from "../styles";

export class PinInput extends Component<IPinInputProps, IPinInputState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false,
    };
    private textInput: TextInput;
    private setPin = (pin: string) => {
        const pins = pin.replace(/[^0-9]+/g, "");
        this && this.props && this.props.onPinChaged(pins);
    };

    constructor(props: IPinInputProps) {
        super(props);
        this.state = {pin: ""};
    }

    componentDidMount(): void {
        this.textInput.focus();
    }

    render(): JSX.Element {
        const pin = this.props.pin;
        const placeholder = this.props.placeholder;

        return (
            <View style={styles.login.containerForm}>
                {pin.length <= 0 ? <Text style={styles.login.placeholder}>{placeholder}</Text> : null}

                <View style={styles.login.inputShow}>
                    <View style={styles.login.digit}>
                        {pin.length > 0 ? <Text style={styles.login.digitValue}>*</Text> : null}
                    </View>
                    <View style={styles.login.digit}>
                        {pin.length > 1 ? <Text style={styles.login.digitValue}>*</Text> : null}
                    </View>
                    <View style={styles.login.digit}>
                        {pin.length > 2 ? <Text style={styles.login.digitValue}>*</Text> : null}
                    </View>
                    <View style={styles.login.digit}>
                        {pin.length > 3 ? <Text style={styles.login.digitValue}>*</Text> : null}
                    </View>
                </View>

                <TextInput
                    ref={(ref) => this.textInput = ref as any}
                    style={styles.login.input}
                    underlineColorAndroid={"transparent"}
                    maxLength={4}
                    returnKeyType={"done"}
                    selectTextOnFocus={false}
                    keyboardType={"numeric"}
                    onChangeText={this.setPin}
                    value={pin}
                />
            </View>
        );
    }

}

interface IPinInputState {

}

interface IPinInputProps {
    pin: string;
    onPinChaged: (pin: string) => void;
    placeholder: string;
}
