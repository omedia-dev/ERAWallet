import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react";
import {stores} from "../../core/stores/Stores";
import {styles} from "../../styles";
import {ImageResources} from "../../common/ImageRecources.g";
import {NavigationBar} from "../../common/NavigationBar";
import {UserPage} from "../../common/UserPage";
import {EraPerson} from "../../core/stores/era/EraPerson";
import {Base58} from "../../core/crypt/libs/Base58";
import {PrivateKeyAccount} from "../../core/src/core/account/PrivateKeyAccount";
import {PublicKeyAccount} from "../../core/src/core/account/PublicKeyAccount";
import {R_SertifyPubKeys} from "../../core/src/core/transaction/R_SertifyPubKeys";
import {request} from "../../App";
import {Loading} from "../../common/Loading";
import {TopNavImg} from "../../common/TopNavImg";
import {Log} from "../../common/Log";
import {Base32JS} from "../../core/crypt/libs/BaseJS";
import {f} from "../../common/t";

@observer
export class DeclareUserPreview extends Component<IUserPreviewProps, IUserPreviewState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private send = async () => {
        if (!this.state.profile || !this.state.publicKey) {
            return;
        }

        this.setState({loading: true});
        try {
            const decodedKey = Base32JS.decode(this.state.publicKey.replace("+", ""));
            console.log(decodedKey);
            const creator = new PrivateKeyAccount(stores.localWallet.keys);
            const reference = await stores.localWallet.getLastReference();
            const publicKeyAccount = new PublicKeyAccount(decodedKey);
            const key = this.state.profile.key;
            const timestamp = new Date().getTime();

            const tx = new R_SertifyPubKeys(creator, 0, key, publicKeyAccount, 0, timestamp, reference);
            await tx.sign(creator, false);

            const input = await tx.toBytes(true, null);
            const raw = await Base58.encode(input);

            await request.broadcast.broadcast(raw);

            stores.localWallet.lastReference = timestamp;
            stores.navigationStore.navigate("DeclareResult", {
                state: true,
                message: f`message_2.1`
            });
        } catch (e) {
            Log.log(e);
            stores.navigationStore.navigate("DeclareResult", {
                state: false,
                message: f`message_1.1`,
                response: JSON.stringify(e),
            });
        }
    };
    private back = () => {
        stores.navigationStore.goBack();
    };

    constructor(props: IUserPreviewProps, context: any) {
        super(props, context);
        this.state = {loading: false};
    }

    componentDidMount() {
        const {person, publicKey} = stores.navigationStore.params;
        if (person) {
            this.setState({profile: person, publicKey});
        } else {
            this.back();
        }
    }

    render(): JSX.Element {
        const profile = this.state.profile;
        if (!profile) {
            return <View/>;
        }

        const btns = (
            <TouchableOpacity onPress={this.send} style={styles.myWallet.buttonLeft} activeOpacity={0.9}>
                <Text style={styles.myWallet.buttonText}>{f`Verify`}</Text>
            </TouchableOpacity>
        );

        return (
            <View style={styles.myContacts.container}>
                <Loading state={this.state.loading}/>
                <TopNavImg/>
                <NavigationBar
                    title={f`Person profile`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                />
                <UserPage btn={btns} profile={profile}/>
            </View>
        );
    }
}

interface IUserPreviewProps extends INavigationProps {
}

interface IUserPreviewState {
    profile?: EraPerson;
    publicKey?: string;
    loading: boolean;
}
