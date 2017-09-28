import React, {Component} from "react";
import {EmitterSubscription, Keyboard, Platform, View} from "react-native";
import {styles} from "../styles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {LargeLogo} from "./LargeLogo";
import {PinInput} from "./PinInput";
import {Btn} from "./Btn/Btn";
import Toast from "react-native-simple-toast";
import {f} from "./t";
import {settings} from "../core/settings/AppSettings";
import {BackBtn} from "./BackBtn";
import {bind} from "../types/autobind";

export class DoublePinInput extends Component<IDoublePinInputProps, IDoublePinInputState> {

    private keyboardDidShowListener: EmitterSubscription;
    private keyboardDidHideListener: EmitterSubscription;

    private prevStep = () => {
        if (this.state.step <= 0) {
            return;
        }

        this.setState({step: this.state.step - 1, pins: ["", ""], keyboardVisible: true});
    };
    private setPin = (pin: string) => {
        const pins = this.state.pins;
        pins[this.state.step] = pin;
        this.setState({pins});
    };
    private nextStep = async () => {
        if (this.state.step > 0) {
            if (this.state.pins[0] === this.state.pins[1]) {
                await this.props.onComplete(this.state.pins[0]);

                return;
            } else {
                this.state.pins[1] = "";
                this.setState({invalidPin: true, step: this.state.step - 1, pins: ["", ""]});
                Toast.show(f`pins do not match`);
            }
        } else {
            this.setState({step: this.state.step + 1});
        }
    };

    componentWillMount(): void {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    @bind
    private _keyboardDidShow() {
        this.setState({keyboardVisible: true});
    }

    @bind
    private _keyboardDidHide() {
        this.setState({keyboardVisible: false});
    }

    constructor(props: IDoublePinInputProps) {
        super(props);

        //DC-209
        this.state = {
            pins: [settings.defaultPin || "", settings.defaultPin || ""],
            step: 0,
            invalidPin: false,
            keyboardVisible: true
        };
        // this.state = {pins: ["", ""], step: 0, invalidPin: false};
    }

    render(): JSX.Element {
        const step = this.state.step;
        const placeholders = [
            f`create pin`,
            f`confirm pin`,
            f`pins do not match`,
        ];
        const pin = this.state.pins[step];

        const placeholder = placeholders[step]; //this.state.invalidPin ? placeholders[2] :

        const chldern = (<View style={{flex: 1}}>
            <View style={styles.login.containerTop}>
                <LargeLogo>
                    {this.state.step === 0 ? null : <BackBtn float={true} onPress={this.prevStep}/>}
                </LargeLogo>
            </View>

            <View
                style={{
                    ...styles.login.containerBottom, ...{
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: 0
                    }
                }}>
                <PinInput placeholder={placeholder} onPinChaged={this.setPin} pin={pin}/>

                <View
                    style={styles.login.containerBtn}>
                    {/*{this.state.step === 0 ? null : <Btn title={f`Back`} fill={true} onPress={this.prevStep}/>}*/}
                    <Btn title={f`Next`} fill={true} onPress={this.nextStep} disabled={pin.length < 4}
                         customBtnStyles={{
                             width: 300,
                             marginBottom: 60
                         }}/>
                </View>
            </View>

            {this.state.keyboardVisible && Platform.OS === "ios" ? <View style={{flex: 1}}/> : null}
        </View>);

        return (
            <View style={styles.container}>
                {Platform.OS === "android" ?
                    <KeyboardAwareScrollView
                        contentContainerStyle={{flex: 1}}
                        keyboardShouldPersistTaps="handled"
                        bounces={false}
                    >
                        {chldern}
                    </KeyboardAwareScrollView> : chldern}

            </View>
        );
    }
}

interface IDoublePinInputProps {
    onComplete: (pin: string) => void;
}

interface IDoublePinInputState {
    pins: string[];
    step: number;
    invalidPin: boolean;
    keyboardVisible: boolean;
}
