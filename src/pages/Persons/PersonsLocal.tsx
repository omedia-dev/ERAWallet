import React from "react";
import {stores} from "../../core/stores/Stores";
import {observer} from "mobx-react";
import {PersonSearchLocalWidget} from "../../common/PersonSearchWidget";
import {Image, Keyboard, View} from "react-native";
import {styles} from "../../styles";
import {ImageResources} from "../../common/ImageRecources.g";
import {NavigationBar} from "../../common/NavigationBar";
import {EraPerson} from "../../core/stores/era/EraPerson";
import {BackHandled} from "../../common/BackHandled";
import {FooterBtn} from "../../common/FooterBtn";
import {f} from "../../common/t";

@observer
export class PersonsLocal extends BackHandled<IPersonSearchLocalProps, IPersonSearchLocalState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private menu = () => {
        Keyboard.dismiss();
        stores.navigationStore.drawerOpen();
    };
    private searchServer = () => {
        stores.navigationStore.navigate("PersonsRemote");
    };
    private selectPerson = (profile: EraPerson) => {
        stores.navigationStore.navigate("UserProfile", {profileKey: profile.key});
    };

    constructor(props: IPersonSearchLocalProps, context: any) {
        super(props, context);
    }

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Image resizeMode={"stretch"} source={ImageResources.background}
                       style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`Favorite persons`}
                    leftButton={ImageResources.icon_menu}
                    onLeftButtonPress={this.menu}
                    rightButton={ImageResources.icon_plus}
                    onRightButtonPress={this.searchServer}
                />

                <PersonSearchLocalWidget onPress={this.selectPerson}/>
                <FooterBtn title={f`Find person in era`} onPress={this.searchServer}/>
            </View>
        );
    }
}

interface IPersonSearchLocalProps extends INavigationProps {

}

interface IPersonSearchLocalState {

}
