import React, {Component} from "react";
import {View} from "react-native";
import {DoublePinInput} from "../../common/DoublePinInput";
import {Loading} from "../../common/Loading";
import {stores} from "../../core/stores/Stores";
import {styles} from "../../styles";

export class ImportPin extends Component<IImportPinProps, IImportPinState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private navigateToWallet = async (pin: string) => {
        await stores.localWallet.importSecretKey(stores.navigationStore.params.secretKey, pin);
        stores.navigationStore.reset("Main");
    };

    constructor(props: IImportPinProps) {
        super(props);
        this.state = {loading: false};
    }

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Loading state={this.state.loading}/>
                <DoublePinInput onComplete={this.navigateToWallet}/>
            </View>
        );
    }
}

interface IImportPinProps {

}

interface IImportPinState {
    loading: boolean;
}
