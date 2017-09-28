import React from "react";
import {Clipboard, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "../../../styles";
import {ImageResources} from "../../../common/ImageRecources.g";
import {NavigationBar} from "../../../common/NavigationBar";
import {IPersonHuman} from "../../../core/src/core/item/persons/IPersonHuman";
import {Toaster} from "../../../common/Toaster";
import {stores} from "../../../core/stores/Stores";
import {Account} from "../../../core/src/core/account/Account";
import {f} from "../../../common/t";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {observer} from "mobx-react";
import {BackHandled} from "../../../common/BackHandled";
import {FooterBtn} from "../../../common/FooterBtn";
import {bind} from "../../../types/autobind";

@observer
export class Send extends BackHandled<ISentProps, ISentState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private showAssets = () => {
        stores.navigationStore.navigate("SendSearchAssets");
    };
    private find = () => {
        stores.navigationStore.navigate("SendSearchPerson");
    };
    private info = () => {
        if (stores.sendStore.recipient) {
            stores.navigationStore.navigate("SendUserPreview", {person: stores.sendStore.recipient, preview: true});
        }
    };
    private onAmountChanged = (text: string) => {
        let amount = text.replace(/[^\d+.,]/g, "").replace(/[.,]+/g, ".").replace(" ", "");
        amount = amount.replace("[\w]+", "");
        if (/\.$/.test(text) && amount.indexOf(".") !== amount.length - 1) {
            amount = amount.replace(/\.$/, "");
        }
        const parts = amount.split(".");
        if (parts.length < 3) {
            if (parts.length === 2) {
                if (parts[1].length < 9) {
                    stores.sendStore.amount = amount;
                }
            } else {
                stores.sendStore.amount = amount;
            }
        }
    };
    private onHeadChanged = (text: string) => {
        stores.sendStore.head = text;
    };
    private onMessageChanged = (text: string) => {
        stores.sendStore.message = text;
    };
    private send = async () => {
        if (!stores.sendStore.recipient) {
            Toaster.error(f`error_5`);

            return;
        }
        if (!Account.isValidAddress(stores.sendStore.recipient.creator)) {
            Toaster.error(f`error_5`);

            return;
        }

        if (!stores.sendStore.amount || !stores.sendStore.head || !stores.sendStore.message) {
            Toaster.error(f`error_6`);

            return;
        }

        if (!stores.sendStore.asset) {
            Toaster.error(f`error_7`);

            return;
        }

        stores.navigationStore.navigate("TransactionConfirm");
    };
    private pasteFromClipboard = async () => {
        const content = await Clipboard.getString();
        try {
            await stores.sendStore.pasteAddress(content);
            Toaster.error(f`Copied from clipboard`);
        } catch (e) {
            Toaster.error(e);
        }
    };

    componentWillMount(): void {
        const person = stores.sendStore.recipient;
        if (person) {
            this.setState({recipientAddress: person.creator, recipientKey: person.key});
        }
    }

    render(): JSX.Element {
        const historyStyle = {...styles.infoItem.container, height: 50, marginTop: 16};
        const asset = stores.sendStore.asset ? stores.sendStore.asset.name : f`Active Name`;
        const address = stores.sendStore.recipient ? stores.sendStore.recipient.creator : "";
        const amount = stores.sendStore.amount ? stores.sendStore.amount.toString() : undefined;

        return (
            <View style={styles.sent.container}>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`Send Active`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                />
                <View style={styles.sent.subContainer}>
                    <KeyboardAwareScrollView
                        contentContainerStyle={{paddingTop: 16, paddingBottom: 60}}
                        viewIsInsideTabBar={true}
                        showsVerticalScrollIndicator={false}
                        enableAutoAutomaticScroll={true}
                        ref="scrollView">
                        <View style={{paddingHorizontal: 16}}>
                            <TouchableOpacity onPress={this.showAssets} style={styles.sent.textContainer}>
                                <TextInput
                                    placeholder={asset}
                                    multiline={false}
                                    numberOfLines={1}
                                    style={styles.sent.textInput}
                                    underlineColorAndroid={"transparent"}
                                    placeholderTextColor={"#A1ACBA"}
                                    value={asset}
                                    editable={false}
                                />
                            </TouchableOpacity>

                            <View style={styles.sent.textContainer}>
                                <TextInput
                                    placeholder={f`Amount`}
                                    multiline={false}
                                    numberOfLines={1}
                                    style={styles.sent.textInput}
                                    onChangeText={this.onAmountChanged}
                                    underlineColorAndroid={"transparent"}
                                    placeholderTextColor={"#A1ACBA"}
                                    keyboardType={"numeric"}
                                    value={amount}
                                />
                            </View>

                            <View style={styles.sent.textContainer}>
                                <TextInput
                                    placeholder={f`Recipient`}
                                    multiline={false}
                                    numberOfLines={1}
                                    style={{...styles.sent.textInput, paddingRight: 48}}
                                    underlineColorAndroid={"transparent"}
                                    placeholderTextColor={"#A1ACBA"}
                                    value={address}
                                    editable={false}
                                />
                                <TouchableOpacity activeOpacity={0.9} onPress={this.find}
                                                  style={styles.sent.invisiableButton}/>

                                <TouchableOpacity activeOpacity={0.9} onPress={this.pasteFromClipboard}
                                                  style={styles.sent.button1}>
                                    <Image style={{width: 28, height: 30}} source={ImageResources.icon_insert}/>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.sent.buttonsContainer}>
                                <TouchableOpacity onPress={this.find} style={styles.sent.buttonsSubContainer}>
                                    <Image style={styles.sent.imageButton} source={ImageResources.icon_search}/>
                                    <Text style={styles.sent.textButton}>{f`Search`}</Text>
                                </TouchableOpacity>

                                {
                                    stores.sendStore.recipient
                                        ? <TouchableOpacity onPress={this.info} style={styles.sent.buttonsSubContainer}>
                                        <Text style={styles.sent.textButton}>{f`Info`}</Text>
                                    </TouchableOpacity>
                                        : null
                                }
                            </View>

                            <View style={historyStyle}>
                                <Text style={styles.sent.titleMessage}>{f`Message`}</Text>
                            </View>

                            <View style={styles.sent.textContainer}>
                                <TextInput
                                    placeholder={f`Header`}
                                    multiline={false}
                                    numberOfLines={1}
                                    style={styles.sent.textInput}
                                    onChangeText={this.onHeadChanged}
                                    underlineColorAndroid={"transparent"}
                                    placeholderTextColor={"#A1ACBA"}
                                    value={stores.sendStore.head}
                                    onFocus={this.onFocus}
                                />
                            </View>

                            <View style={styles.sent.textContainer}>
                                <TextInput
                                    placeholder={f`Comment`}
                                    multiline={true}
                                    numberOfLines={6}
                                    style={{...styles.sent.textInput, ...styles.sent.textCommentInput}}
                                    onChangeText={this.onMessageChanged}
                                    underlineColorAndroid={"transparent"}
                                    placeholderTextColor={"#A1ACBA"}
                                    value={stores.sendStore.message}
                                    onFocus={this.onFocus}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </View>

                <FooterBtn onPress={this.send}>
                    <Image style={styles.myWallet.buttonImage} source={ImageResources.icon_sent}/>
                    <Text style={styles.myWallet.buttonText}>{f`Sent`}</Text>
                </FooterBtn>
            </View>
        );
    }

    @bind
    private onFocus(): void {
        setTimeout(() => (this.refs.scrollView as any).scrollToEnd(true), 250);
    }
}

interface ISentProps extends INavigationProps {
}

interface ISentState {
    recipientAddress: string;
    recipientKey: number | undefined;
    amount: string;
    head: string;
    message: string;
    recipient?: IPersonHuman;
    invalidAddress?: string;
    currencyKey: number;
    currencyLabel: string;
}
