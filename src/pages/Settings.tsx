import React from "react";
import {Image, ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {BackHandled} from "../common/BackHandled";
import {ImageResources} from "../common/ImageRecources.g";
import {dWidth, secondaryColor, styles, textBorderColor} from "../styles";
import {NavigationBar} from "../common/NavigationBar";
import {FontNames} from "../common/FontNames";
import {CopyInput} from "../common/CopyInput";
import {stores} from "../core/stores/Stores";
import {IKeyPairString} from "../core/src/core/account/KeyPair";
import {f} from "../common/t";
import {TextAlign} from "../types/RNStyles";
import {settings} from "../core/settings/AppSettings";
import {BottomMenu} from "../common/BottomMenu";
import {BtnStyles} from "../common/Btn/styles";
import {observer} from "mobx-react";

@observer
export class Settings extends BackHandled<ISettingsProps, ISettingsState> {

    private add = () => {

    };

    private remove = () => {

    };

    constructor(props: ISettingsProps) {
        super(props);
        this.state = {keys: {} as IKeyPairString, base32Key: ""};
    }

    async componentWillMount(): Promise<void> {
        this.setState({keys: await stores.localWallet.stringKeys(), base32Key: stores.localWallet.base32Key()});
    }

    render(): JSX.Element {
        const secretKey = this.state.keys.secretKey || "";
        const publicKey = this.state.keys.publicKey || "";
        const public32Key = this.state.base32Key || "";

        const langActions = Object.keys(stores.localizationStore.LanguageKeys).map((g) => ({
            name: stores.localizationStore.LanguageKeys[g],
            action: (): void => {
                stores.localizationStore.currentLang = g;
            }
        }));

        return (
            <View style={style.container}>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`Settings`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                />

                <ScrollView contentContainerStyle={style.cont}>
                    <View style={{}}>
                        <Text style={style.text}>{f`Keys`}</Text>
                        <View style={{...styles.shared.hr, marginVertical: 13}}/>

                        <Text style={{...style.text, marginBottom: 5}}>{f`Private Key`}</Text>
                        <CopyInput text={publicKey}/>

                        <Text style={{...style.text, marginTop: 10, marginBottom: 5}}>{f`Public bank key`}</Text>
                        <CopyInput text={public32Key}/>

                        <Text style={{...style.text, marginTop: 10, marginBottom: 5}}>{f`Private key`}</Text>
                        <CopyInput text={secretKey.slice(0, 10) + "..."} textToCopy={secretKey}/>

                        <Text style={{...style.text, marginTop: 10, marginBottom: 5}}>{f`Language`}</Text>

                        <BottomMenu actions={langActions}>
                            <View style={BtnStyles.container}>
                                <View style={styles.register.dropDown.container}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            ...BtnStyles.text, ...{
                                                color: textBorderColor,
                                                maxWidth: (dWidth - 184) / 2
                                            }
                                        }}
                                    >{stores.localizationStore.LanguageKeys[stores.localizationStore.currentLang] || f`Language`}
                                    </Text>
                                    <Image style={styles.register.dropDown.icon} source={ImageResources.icon_arr_down}/>
                                </View>
                            </View>
                        </BottomMenu>

                    </View>

                    <View style={styles.settings.serverContainer}>
                        <View style={styles.settings.serverLabelContainer}>
                            <Text style={styles.settings.serverLabel}> {f`Server`}</Text>
                        </View>
                        <View style={styles.shared.line}/>

                        <View style={{paddingVertical: 8}}>
                            {/*это будет айтем списка*/}
                            <View style={styles.settings.serverItemContainer}>
                                <View style={styles.settings.serverItemSubContainer}>
                                    <View style={styles.settings.dot}/>
                                    <Text style={styles.settings.serverName}>Default 1</Text>
                                </View>
                                {true ? null : (<TouchableOpacity onPress={this.remove}>
                                    <Image style={styles.settings.serverDelete}
                                           source={ImageResources.icon_delete_gray}/>
                                </TouchableOpacity>)}
                            </View>

                        </View>

                        <TouchableOpacity onPress={this.add} style={styles.settings.serverAddContainer}>
                            <Image style={styles.settings.serverAddImage} source={ImageResources.icon_plus_server}/>
                            <Text style={styles.settings.serverAddLabel}>{f`Add Server`}</Text>
                        </TouchableOpacity>

                        <Text style={style.version}>v{settings.version}.{settings.build}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const style = {
    container: {
        backgroundColor: "#fff",
        flex: 1
    } as ViewStyle,

    cont: {
        padding: 16
    } as ViewStyle,

    text: {
        fontFamily: FontNames.ProstoLight,
        fontSize: 16,
        color: secondaryColor,
    } as TextStyle,

    version: {
        fontSize: 5,
        textAlign: TextAlign.right
    } as TextStyle
};

interface ISettingsProps {

}

interface ISettingsState {
    keys: IKeyPairString;
    base32Key: string;
}
