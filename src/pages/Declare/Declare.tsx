import React from "react";
import {Clipboard, Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../styles";
import {ImageResources} from "../../common/ImageRecources.g";
import {NavigationBar} from "../../common/NavigationBar";
import {stores} from "../../core/stores/Stores";
import {Loading} from "../../common/Loading";
import {Log} from "../../common/Log";
import {Toaster} from "../../common/Toaster";
import {BackHandled} from "../../common/BackHandled";
import {f} from "../../common/t";

export class Declare extends BackHandled<IDeclareProps, IDeclareState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private menu = () => {
        stores.navigationStore.drawerOpen();
    };
    private pasteFromClipboard = async () => {
        const content = await Clipboard.getString();
        this.setState({publicKey: content});
    };
    private onAdd = async () => {
        this.setState({loading: true});
        const showError = () => {
            Toaster.error(f`error_8`);
            this.setState({loading: false});
        };
        try {
            const person = await stores.personsStore.getByBase32(this.state.publicKey);
            if (person) {
                stores.navigationStore.navigate("DeclareUserPreview", {person, publicKey: this.state.publicKey});
            } else {
                showError();
            }
        } catch (e) {
            Log.log(e);
            showError();
        }
    };

    async componentWillMount(): Promise<void> {
        this.setState({
            loading: false,
            publicKey: ""
        });
    }

    render(): JSX.Element {
        return (
            <View style={styles.userPlus.container}>
                <Loading state={this.state.loading}/>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`person confirmation`}
                    leftButton={ImageResources.icon_menu}
                    onLeftButtonPress={this.menu}
                />
                <View style={styles.userPlus.subContainer}>
                    <View style={{...styles.infoItem.container, ...{height: 50}}}>
                        <Text style={styles.infoItem.title}>{f`Insert address person`}</Text>
                    </View>
                    <View>
                        <Text style={{
                            ...styles.userPlus.textInput,
                            minHeight: 47,
                            lineHeight: 30
                        }}>{this.state.publicKey}</Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={this.pasteFromClipboard}
                                          style={styles.userPlus.button}>
                            <Image style={styles.userPlus.image} source={ImageResources.icon_insert}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.myWallet.bottomContainer}>
                    <TouchableOpacity onPress={this.onAdd} style={styles.myWallet.buttonLeft} activeOpacity={0.9}>
                        <Text style={styles.myWallet.buttonText}>{f`Confirm`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

interface IDeclareProps extends INavigationProps {
}

interface IDeclareState {
    publicKey: string;
    loading: boolean;
}
