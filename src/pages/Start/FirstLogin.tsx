import React, {Component} from "react";
import {View} from "react-native";
import {stores} from "../../core/stores/Stores";
import {DoublePinInput} from "../../common/DoublePinInput";
import {styles} from "../../styles";

export class FirstLogin extends Component<IFirstLoginProps, IFirstLoginState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false,
    };
    private navigateToComplete = async (pin: string) => {
        stores.navigationStore.reset("Complete", {pin});
    };

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <DoublePinInput onComplete={this.navigateToComplete}/>
            </View>
        );
    }
}

interface IFirstLoginState {
}

interface IFirstLoginProps extends INavigationProps {
}
