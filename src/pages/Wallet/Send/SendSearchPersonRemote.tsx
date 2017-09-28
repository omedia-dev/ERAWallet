import React from "react";
import {bind} from "../../../types/autobind";
import {EraPerson} from "../../../core/stores/era/EraPerson";
import {stores} from "../../../core/stores/Stores";
import {Image, View} from "react-native";
import {styles} from "../../../styles";
import {ImageResources} from "../../../common/ImageRecources.g";
import {NavigationBar} from "../../../common/NavigationBar";
import {PersonSearchRemoteWidget} from "../../../common/PersonSearchRemoteWidget";
import {BackHandled} from "../../../common/BackHandled";
import {f} from "../../../common/t";

export class SendSearchPersonRemote extends BackHandled<ISendSearchPersonRemoteProps, ISendSearchPersonRemoteState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private setPerson = (person: EraPerson) => {
        stores.navigationStore.navigate("SendUserPreview", {person});
    };

    constructor(props: ISendSearchPersonRemoteProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`Search`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                />

                <PersonSearchRemoteWidget onPress={this.setPerson}/>
            </View>
        );
    }

    @bind
    protected back(): any {
        stores.navigationStore.navigate("Send");
        return true;
    }
}

interface ISendSearchPersonRemoteProps {

}

interface ISendSearchPersonRemoteState {

}
