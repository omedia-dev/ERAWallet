import React from "react";
import {Image, View} from "react-native";
import {ImageResources} from "../../common/ImageRecources.g";
import {styles} from "../../styles";
import {NavigationBar} from "../../common/NavigationBar";
import {stores} from "../../core/stores/Stores";
import {observer} from "mobx-react";
import {AssetsLocalWidget} from "../../common/AssetsLocalWidget";
import {BackHandled} from "../../common/BackHandled";
import {FooterBtn} from "../../common/FooterBtn";
import {f} from "../../common/t";

@observer
export class AssetsLocal extends BackHandled<IAssetsProps, IAssetsState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private menu = () => {
        stores.navigationStore.drawerOpen();
    };
    private searchAssets = () => {
        stores.navigationStore.navigate("AssetsRemote");
    };

    constructor(props: IAssetsProps) {
        super(props);
        this.state = {} as IAssetsState;
    }

    render(): JSX.Element {
        return (
            <View style={styles.contacts.container}>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title= {f`Favorite assets`}
                    leftButton={ImageResources.icon_menu}
                    onLeftButtonPress={this.menu}
                    rightButton={ImageResources.icon_plus}
                    onRightButtonPress={this.searchAssets}
                />
                <View style={{flex: 1, padding: 16, paddingBottom: 60}}>
                    <AssetsLocalWidget/>
                    <FooterBtn title={f`Find in Era`} onPress={this.searchAssets}/>
                </View>
            </View>
        );
    }
}

interface IAssetsProps {

}

interface IAssetsState {

}
