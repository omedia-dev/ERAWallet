import React, {Component} from "react";
import {Text, View} from "react-native";
import {primaryColorLight, styles} from "../../styles";
import {LargeLogo} from "../../common/LargeLogo";
import {observer} from "mobx-react";
import {stores} from "../../core/stores/Stores";
import {Btn} from "../../common/Btn/Btn";
import {f} from "../../common/t";

@observer
export class CreateWallet extends Component<ICreateWalletProps, ICreateWalletState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false,
    };
    private navigateToLicense = () => {
        stores.navigationStore.navigate("License");
    };
    private navigateToImport = () => {
        stores.navigationStore.navigate("Import");
    };

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <View style={styles.login.containerTop}>
                    <LargeLogo/>
                </View>

                <View style={styles.login.containerBottom}>
                    <Text style={styles.login.message}>{f`message_5`}</Text>
                    <Btn title={f`Restore old`} fill={true} onPress={this.navigateToImport}
                         fillColor={primaryColorLight}
                         customBtnStyles={{marginBottom: 8}}/>
                    <Btn title={f`Create new`} fill={true} onPress={this.navigateToLicense}/>
                </View>
            </View>
        );
    }
}

interface ICreateWalletProps extends INavigationProps {
}

interface ICreateWalletState {

}
