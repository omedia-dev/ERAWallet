import React from "react";
import {Share, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../styles";
import {NavigationBar} from "../common/NavigationBar";
import {ImageResources} from "../common/ImageRecources.g";
import {stores} from "../core/stores/Stores";
import {observer} from "mobx-react";
import {f} from "../common/t";
import {UserPage} from "../common/UserPage";
import {TopNavImg} from "../common/TopNavImg";
import {EraPerson} from "../core/stores/era/EraPerson";
import {BackHandled} from "../common/BackHandled";

@observer
export class MyProfile extends BackHandled<IMyAccountProps, IMyAccountState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private menu = () => {
        stores.navigationStore.drawerOpen();
    };
    private share = async () => {
        const key = this.state.profile && this.state.profile.key;
        const link = `http://datachains.world:9067/index/blockexplorer?person=${key}&lang=en`;
        await Share.share({title: f`I'am in the Era System`, message: link}, {});
    };

    constructor(props: IMyAccountProps, context: any) {
        super(props, context);

        this.state = {userKeys: {}};
    }

    async componentWillMount(): Promise<void> {
        const keys = await stores.localWallet.stringKeys();
        const address = stores.localWallet.address;
        this.setState({userKeys: {publicKey: keys.publicKey, address}});
    }

    render(): JSX.Element {
        const profile = stores.accountStore.profile;
        if (!profile) {
            return <View/>;
        }

        const btn = <TouchableOpacity onPress={this.share} style={styles.myWallet.buttonLeft} activeOpacity={0.9}>
            <Text style={styles.myWallet.buttonText}>{f`Share my contact`}</Text>
        </TouchableOpacity>;

        return (
            <View style={styles.myContacts.container}>
                <TopNavImg/>
                <NavigationBar
                    title={f`My Profile`}
                    leftButton={ImageResources.icon_menu}
                    onLeftButtonPress={this.menu}
                />

                <UserPage profile={profile} btn={btn}/>
            </View>
        );
    }
}

interface IMyAccountProps extends INavigationProps {
}

interface IMyAccountState {
    userKeys: { address?: string, publicKey?: string } ;
    profile?: EraPerson;
}
