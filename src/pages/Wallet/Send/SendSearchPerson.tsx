import React from "react";
import {PersonSearchLocalWidget} from "../../../common/PersonSearchWidget";
import {bind} from "../../../types/autobind";
import {EraPerson} from "../../../core/stores/era/EraPerson";
import {stores} from "../../../core/stores/Stores";
import {Image, View} from "react-native";
import {styles} from "../../../styles";
import {ImageResources} from "../../../common/ImageRecources.g";
import {NavigationBar} from "../../../common/NavigationBar";
import {BackHandled} from "../../../common/BackHandled";
import {f} from "../../../common/t";

export class SendSearchPerson extends BackHandled<ISendSearchPersonProps, ISendSearchPersonState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private setPerson = (person: EraPerson) => {
        stores.sendStore.recipient = person;
        this.back();
    };
    private searchServer = () => {
        stores.navigationStore.navigate("SendSearchPersonRemote");
    };

    constructor(props: ISendSearchPersonProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`Persons dict`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                    rightButton={ImageResources.icon_plus}
                    onRightButtonPress={this.searchServer}
                />

                <PersonSearchLocalWidget onPress={this.setPerson}/>
            </View>
        );
    }

    @bind
    protected back(): any {
        stores.navigationStore.navigate("Send");
        return true;
    }
}

interface ISendSearchPersonProps {

}

interface ISendSearchPersonState {

}
