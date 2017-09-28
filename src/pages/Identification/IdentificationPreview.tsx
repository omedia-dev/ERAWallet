import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {bind} from "../../types/autobind";
import {styles} from "../../styles";
import {ImageResources} from "../../common/ImageRecources.g";
import {stores} from "../../core/stores/Stores";
import {observer} from "mobx-react";
import {NavigationBar} from "../../common/NavigationBar";
import {BackHandled} from "../../common/BackHandled";
import {request} from "../../App";
import {Base58} from "../../core/crypt/libs/Base58";
import {PrivateKeyAccount} from "../../core/src/core/account/PrivateKeyAccount";
import {IssuePersonRecord} from "../../core/src/core/transaction/IssuePersonRecord";
import {UserPage} from "../../common/UserPage";
import {f} from "../../common/t";
import {Loading} from "../../common/Loading";
import {EraPerson} from "../../core/stores/era/EraPerson";
import {TopNavImg} from "../../common/TopNavImg";
import {Log} from "../../common/Log";
import {IIdentificationStateParams} from "./IdentificationState";

@observer
export class IdentificationPreview extends BackHandled<IIdentificationPreviewProps, IIdentificationPreviewState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private done = async () => {
        this.setState({loading: true});

        const senderPrivateKey = new PrivateKeyAccount(stores.localWallet.keys);
        const reference = await stores.localWallet.getLastReference();
        const timestamp = new Date().getTime();
        const tx = new IssuePersonRecord(new PrivateKeyAccount(stores.localWallet.keys), stores.identificationStore.person, 0, timestamp, reference);
        await tx.sign(senderPrivateKey, false);

        const raw = await Base58.encode(await tx.toBytes(true, null));

        try {
            const response = await request.broadcast.broadcastPost(raw);
            stores.localWallet.lastReference = timestamp;
            this.setState({loading: false});
            stores.navigationStore.navigate("IdentificationState", {
                result: true,
                response: JSON.stringify(response)
            } as IIdentificationStateParams);
        } catch (response) {
            Log.log(response);
            this.setState({loading: false});
            stores.navigationStore.navigate("IdentificationState", {
                result: false,
                response: JSON.stringify(response)
            } as IIdentificationStateParams);
        }
    };

    constructor(props: IIdentificationPreviewProps) {
        super(props);
        this.state = {loading: false};
    }

    async componentDidMount(): Promise<void> {
        super.componentDidMount();

        this.setState({loading: true});
        this.setState({loading: false, profile: await stores.identificationStore.getProfile()});
    }

    render(): JSX.Element {
        const profile = this.state.profile;
        if (!profile) {
            return <View/>;
        }

        return (
            <View style={styles.myContacts.container}>
                <Loading state={this.state.loading}/>
                <TopNavImg/>
                <NavigationBar
                    title={f`Person data`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                />
                <UserPage profile={profile} btn={this.renderDoneBtn()}/>
            </View>
        );
    }

    renderDoneBtn() {
        return (<TouchableOpacity onPress={this.done} style={styles.myWallet.buttonLeft} activeOpacity={0.9}>
            <Text style={styles.myWallet.buttonText}>{f`Add`}</Text>
        </TouchableOpacity>);
    }

    @bind
    protected back(): any {
        stores.navigationStore.navigate("Identification");
        return true;
    }
}

interface IIdentificationPreviewProps extends INavigationProps {

}

interface IIdentificationPreviewState {
    profile?: EraPerson;
    loading: boolean;
}
