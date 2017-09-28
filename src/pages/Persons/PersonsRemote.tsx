import React from "react";
import {Image, View} from "react-native";
import {styles} from "../../styles";
import {NavigationBar} from "../../common/NavigationBar";
import {ImageResources} from "../../common/ImageRecources.g";
import {observer} from "mobx-react";
import {f} from "../../common/t";
import {BackHandled} from "../../common/BackHandled";
import {PersonSearchRemoteWidget} from "../../common/PersonSearchRemoteWidget";
import {bind} from "../../types/autobind";
import {stores} from "../../core/stores/Stores";
import {EraPerson} from "../../core/stores/era/EraPerson";

@observer
export class PersonsRemote extends BackHandled<IPersonSearchRemoteProps, IPersonSearchRemoteState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private onPress = async (profile: EraPerson) => {
        stores.navigationStore.navigate("UserProfile", {profileKey: profile.key});
    };

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`Search persons in Erachain`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                />

                <PersonSearchRemoteWidget onPress={this.onPress}/>
            </View>
        );
    }

    @bind
    protected back(): any {
        stores.navigationStore.navigate("PersonsLocal");
        return true;
    }
}

interface IPersonSearchRemoteProps extends INavigationProps {

}

interface IPersonSearchRemoteState {
    busy: boolean;
}
