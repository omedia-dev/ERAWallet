import React from "react";
import {Clipboard, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {LargeLogo} from "../../common/LargeLogo";
import {styles, textPlaceholderColor} from "../../styles";
import {stores} from "../../core/stores/Stores";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Loading} from "../../common/Loading";
// import {settings} from "../core/settings/AppSettings";
import {ImageResources} from "../../common/ImageRecources.g";
import Toast from "react-native-simple-toast";
import {f} from "../../common/t";
import {AppCrypt} from "../../core/crypt/AppCrypt";
import {Base58} from "../../core/crypt/libs/Base58";
import {Toaster} from "../../common/Toaster";
import {Log} from "../../common/Log";
import {request} from "../../App";
import {BackHandled} from "../../common/BackHandled";
import {PrivateKeyAccount} from "../../core/src/core/account/PrivateKeyAccount";
import {BackBtn} from "../../common/BackBtn";

export class Import extends BackHandled<IImportProps, IImportState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private pasteFromClipboard = async () => {
        const content = await Clipboard.getString();
        const valid = await  PrivateKeyAccount.validate(content);
        this.setState({secretKey: content, validKey: valid});
        Toast.show(f`Copied from clipboard`);
    };
    private done = async () => {
        this.setState({loading: true});

        let publicKey;
        let publicKeyInt;
        try {
            publicKeyInt = await AppCrypt.getPublicKeyBySecretKey(this.state.secretKey);
            publicKey = await Base58.encode(publicKeyInt);
        } catch (e) {
            Log.log(e);
            Toaster.error(e);
            this.setState({loading: false});

            return;
        }

        try {
            const key = await request.persons.byPublicKey(publicKey);
            if (key) {
                // const person = await request.persons.byKey(key);
                //
                // const address = await AppCrypt.getAddressByPublicKey(publicKeyInt);

                // stores.blockStore.registrationState = IdentityState.Submitted;
                // stores.appStore.dataStorage.importData(person, address, publicKey, this.state.secretKey);

                //теперь получаем на скрине меню
                // await stores.accountStore.getAccountData();
            }
        } catch (e) {
            // персоны нет в системе. Работаем аннимно
        } finally {
            this.setState({loading: false});
            stores.navigationStore.navigate("ImportPin", {secretKey: this.state.secretKey});
        }
    };

    constructor(props: IImportProps, context: any) {
        super(props, context);

        this.state = {loading: false, secretKey: /*settings.defaultSecretKey ||*/ "", validKey: false};
    }

    render(): JSX.Element {
        const continueButton = this.state.validKey ? (
                <View style={styles.register.bottomContainer}>
                    <TouchableOpacity onPress={this.done} style={styles.register.buttonContinue} activeOpacity={0.9}>
                        <Text style={styles.register.buttonText}>{f`Continue`}</Text>
                    </TouchableOpacity>
                </View>) :
            <View style={styles.register.bottomContainer}>
                <View style={{...styles.register.buttonContinue, ...{backgroundColor: "#D1D5DB"}}}>
                    <Text style={styles.register.buttonNextDisabledText}>{f`Continue`}</Text>
                </View>
            </View>;

        return (
            <View style={styles.container}>
                <Loading state={this.state.loading}/>

                <KeyboardAwareScrollView viewIsInsideTabBar={true} alwaysBounceVertical={false}>
                    <View style={styles.register.top}>
                        <LargeLogo>
                            <BackBtn float={true} onPress={this.back}/>
                        </LargeLogo>
                    </View>
                    <View style={{...styles.register.bottom, ...{paddingVertical: 31}}}>
                        <View style={styles.register.formRow}>
                            <Text style={styles.register.message}>{f`Please, insert secret key`}</Text>
                        </View>
                        <View style={styles.register.formRow}>
                            <TextInput
                                placeholder={"..."}
                                placeholderTextColor={textPlaceholderColor}
                                style={styles.register.textInput}
                                underlineColorAndroid={"transparent"}
                                value={this.state.secretKey}
                                editable={false}
                            />

                            <TouchableOpacity activeOpacity={0.9} onPress={this.pasteFromClipboard}
                                              style={styles.register.button1}>
                                <Image style={{width: 28, height: 30}}
                                       source={ImageResources.icon_insert}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                {continueButton}
            </View>
        );
    }
}

interface IImportProps extends INavigationProps {
}

interface IImportState {
    loading: boolean;
    secretKey: string;
    validKey: boolean;
}
