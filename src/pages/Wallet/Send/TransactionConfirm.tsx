import React from "react";
import {Image, ScrollView, Text, View} from "react-native";
import {bind} from "../../../types/autobind";
import {styles} from "../../../styles";
import {NavigationBar} from "../../../common/NavigationBar";
import {ImageResources} from "../../../common/ImageRecources.g";
import {stores} from "../../../core/stores/Stores";
import {observer} from "mobx-react";
import {f} from "../../../common/t";
import {BigDecimal} from "../../../common/BigDecimal";
import {PrivateKeyAccount} from "../../../core/src/core/account/PrivateKeyAccount";
import {Bytes} from "../../../core/src/core/Bytes";
import {R_Send} from "../../../core/src/core/transaction/R_Send";
import {Base58} from "../../../core/crypt/libs/Base58";
import {request} from "../../../App";
import {Account} from "../../../core/src/core/account/Account";
import {UserListItem} from "../../../common/UserListItem";
import {BackHandled} from "../../../common/BackHandled";
import {FooterBtn} from "../../../common/FooterBtn";
import {Loading} from "../../../common/Loading";
import {ISendResultParams} from "./SendResult";

@observer
export class TransactionConfirm extends BackHandled<IMyWalletProps, IMyWalletState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };

    tx: R_Send;

    senderPrivateKey: PrivateKeyAccount;

    timestamp: number;

    transaction: string;

    private confirm = async () => {
        this.setState({loading: true});
        const params = {} as ISendResultParams;

        try {
            const response = await request.broadcast.broadcast(this.transaction);

            params.response = JSON.stringify(response);
            params.state = true;
            params.message = f`message_2`;

            stores.localWallet.lastReference = this.timestamp;
        } catch (e) {
            params.response = JSON.stringify(e);
            params.state = false;
            params.message = f`message_1`;
        }

        this.setState({loading: false});

        stores.navigationStore.navigate("SendResult", params);
        stores.sendStore.clean();
    };

    constructor(props: IMyWalletProps) {
        super(props);

        this.state = {loading: false};
    }

    async componentWillMount(): Promise<void> {
        this.senderPrivateKey = new PrivateKeyAccount(stores.localWallet.keys);
        const feePow = 1;
        const recipient = new Account(stores.sendStore.recipient!.creator);
        const amount = new BigDecimal(stores.sendStore.amount);
        const head = stores.sendStore.head;
        const key = stores.sendStore.asset!.key;
        const messageBytes = await Bytes.stringToByteArray(stores.sendStore.message);
        const isText = new Int8Array([1]);
        const isEncripted = new Int8Array([0]);
        this.timestamp = new Date().getTime();
        const reference = await stores.localWallet.getLastReference(stores.localWallet.address);
        this.tx = new R_Send(this.senderPrivateKey, feePow, recipient, key, amount, head, messageBytes, isText, isEncripted, this.timestamp, reference);
        await this.tx.sign(this.senderPrivateKey, false);
        this.transaction = await
            Base58.encode(await
                this.tx.toBytes(true, null)
            )
        ;
        const fee = this.tx.getFeeBig();
        const size = await this.tx.getDataLength(false);
        stores.sendStore.fee = fee.num / (Math.pow(10, 8));
        stores.sendStore.size = size;
    }

    render(): JSX.Element {
        const compu = stores.assetsStore.compu;
        const noMoney = compu && compu.amount < stores.sendStore.fee;
        const noMoneyMessage = noMoney ?
            <Text style={styles.transactionConfirm.warningText}>{f`not enoght COMPU`}</Text> :
            <Text style={styles.transactionConfirm.message}>{f`confirm pls`}</Text>;

        return (
            <View style={styles.container}>
                <Loading state={this.state.loading}/>

                <Image source={ImageResources.image} style={styles.myContacts.topBackgroundImage}/>
                <NavigationBar
                    title={f `Transaction Confirmation`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                />
                <View style={styles.transactionConfirm.middleContainer}>
                    <ScrollView>
                        <View style={{paddingHorizontal: 24, paddingBottom: 60}}>
                            <View style={styles.transactionConfirm.messageContainer}>
                                {noMoneyMessage}
                            </View>
                            <View style={styles.transactionConfirm.headerInfoContainer}>
                                <Text style={styles.transactionConfirm.receiver}>{f`Recipient`}:</Text>
                                <Text numberOfLines={1} style={styles.transactionConfirm.account}>{f`Account`}: {stores.sendStore.recipient && stores.sendStore.recipient.creator}</Text>
                            </View>
                            <View style={{paddingVertical: 8}}>
                                {/*для верхнего paddingVertical: 8*/}
                                {stores.sendStore.recipient ?
                                    <UserListItem person={stores.sendStore.recipient}/> : null}
                            </View>
                            <View style={styles.transactionConfirm.bottomInfoContainerTextStyle}>
                                <Text
                                    style={styles.transactionConfirm.textDesc}>{f`Amount`}: {stores.sendStore.amount} {stores.sendStore.asset && stores.sendStore.asset.name}</Text>
                                <Text
                                    style={styles.transactionConfirm.textDesc}>{f`Header`}: {stores.sendStore.head}</Text>
                                <Text
                                    style={styles.transactionConfirm.textDesc}>{f`Comment`}: {stores.sendStore.message}</Text>
                                <Text style={styles.transactionConfirm.textDesc}>{f`Size`}: {stores.sendStore.size}</Text>
                            </View>
                            <Text style={styles.transactionConfirm.feeText}>{f`will be fee`}: {stores.sendStore.fee}{"\u00a0"}COMPU</Text>
                        </View>
                    </ScrollView>
                </View>

                <FooterBtn onPress={noMoney ? this.back : this.confirm} title={noMoney ? f`Decline` : f`Sent`}/>
            </View>
        );
    }

    @bind
    protected back(): any {
        stores.navigationStore.navigate("Send");
        return true;
    }
}

interface IMyWalletProps extends INavigationProps {
}

interface IMyWalletState {
    loading: boolean;
}
