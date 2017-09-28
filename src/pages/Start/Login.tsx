import React, {Component} from "react";
import {View} from "react-native";
import {styles} from "../../styles";
import {LargeLogo} from "../../common/LargeLogo";
import {observer} from "mobx-react";
import {Loading} from "../../common/Loading";
import {PinInput} from "../../common/PinInput";
import {f} from "../../common/t";
import {stores} from "../../core/stores/Stores";
import {Toaster} from "../../common/Toaster";
import {settings} from "../../core/settings/AppSettings";

@observer
export class Login extends Component<ILoginProps, ILoginState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false,
    };

    private maxLength = 4;
    private setPin = async (pin: string) => {
        this.setState({pin});

        if (pin.length === this.maxLength) {
            this.setState({loading: true});
            try {
                await stores.localWallet.unlock(pin);
                stores.navigationStore.reset("Main");
            } catch (e) {
                this.setState({loading: false, pin: ""});
                Toaster.error(e);
            }
        }
    };

    constructor(props: ILoginProps) {
        super(props);
        this.state = {pin: "", loading: false};
    }

    async componentDidMount(): Promise<void> {
        await this.setPin(settings.defaultPin);
    }

    render(): JSX.Element {
        const pin = this.state.pin;

        return (
            <View style={styles.container}>
                <Loading state={this.state.loading}/>

                <View style={styles.login.containerTop}>
                    <LargeLogo/>
                </View>

                <View style={styles.login.containerBottom}>
                    <PinInput placeholder={f`input pin`} onPinChaged={this.setPin} pin={pin}/>
                </View>
            </View>
        );
    }
}

interface ILoginProps extends INavigationProps {
}

interface ILoginState {
    pin: string;
    loading: boolean;
}
