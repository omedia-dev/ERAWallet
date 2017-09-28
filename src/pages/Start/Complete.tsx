import React, {Component} from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../styles";
import {LargeLogo} from "../../common/LargeLogo";
import {stores} from "../../core/stores/Stores";
import {IKeyPairString} from "../../core/src/core/account/KeyPair";
import {Loading} from "../../common/Loading";
import {Toaster} from "../../common/Toaster";
import {CopySecretKey} from "../../common/CopySecretKey";
import {f} from "../../common/t";

export class Complete extends Component<ICompleteProps, ICompleteState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false,
    };
    private complete = async () => {
        this.setState({loading: true});
        try {
            await stores.localWallet.writeFile();
            stores.navigationStore.reset("Main");
        } catch (e) {
            this.setState({loading: false});
            Toaster.error(e);
        }
    };
    private onComplete = (valid: boolean) => {
        this.setState({valid: valid});
    };

    constructor(props: ICompleteProps, context: any) {
        super(props, context);

        this.state = {loading: false, valid: false};
    }

    async componentDidMount(): Promise<void> {
        if (!stores.navigationStore.params.pin) {
            stores.navigationStore.goBack();

            return;
        }

        this.setState({loading: true});
        await stores.localWallet.create(stores.navigationStore.params.pin);
        const keys = await stores.localWallet.stringKeys();
        this.setState({loading: false, keys});
    }

    render(): JSX.Element {
        const continueButton = this.state.valid ? (
                <View style={styles.login.bottomContainer}>
                    <TouchableOpacity onPress={this.complete} style={styles.register.buttonContinue}
                                      activeOpacity={0.9}>
                        <Text style={styles.register.buttonText}>{f`Next`}</Text>
                    </TouchableOpacity>
                </View>) :
            <View style={styles.login.bottomContainer}>
                <View style={{...styles.register.buttonContinue, ...{backgroundColor: "#D1D5DB"}}}>
                    <Text style={styles.register.buttonNextDisabledText}>{f`Next`}</Text>
                </View>
            </View>;

        return (
            <View style={styles.container}>
                <Loading state={this.state.loading}/>

                <View style={styles.login.containerTop}><LargeLogo/></View>

                <View style={styles.login.containerBottomComplete}>
                    <ScrollView>
                        <View style={{paddingHorizontal: 16, paddingBottom: 16}}>
                            <Text style={styles.register.completeBigMessage}>{f`secret key generated`}</Text>
                            {this.state.keys ? <CopySecretKey onComplete={this.onComplete}/> : null}
                        </View>
                    </ScrollView>
                </View>
                {continueButton}
            </View>
        );
    }
}

interface ICompleteState {
    loading: boolean;
    keys?: IKeyPairString;
    valid: boolean;
}

interface ICompleteProps extends INavigationProps {
}
