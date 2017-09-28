import React from "react";
import {Image, View} from "react-native";
import {styles} from "../../../styles";
import {observer} from "mobx-react";
import {AssetsLocalWidget} from "../../../common/AssetsLocalWidget";
import {bind} from "../../../types/autobind";
import {stores} from "../../../core/stores/Stores";
import {ImageResources} from "../../../common/ImageRecources.g";
import {NavigationBar} from "../../../common/NavigationBar";
import {EraAsset} from "../../../core/stores/era/EraAsset";
import {BackHandled} from "../../../common/BackHandled";
import {FooterBtn} from "../../../common/FooterBtn";
import {f} from "../../../common/t";

@observer
export class SendSearchAssets extends BackHandled<ISentProps, ISentState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private searchAssets = () => {
        stores.navigationStore.navigate("SendSearchAssetsRemote");
    };
    private setAsset = (asset: EraAsset) => {
        stores.sendStore.asset = asset;
        this.back();
    };

    render(): JSX.Element {
        return (
            <View style={styles.contacts.container}>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`Assets dict`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                    rightButton={ImageResources.icon_plus}
                    onRightButtonPress={this.searchAssets}
                />
                <View style={{flex: 1, padding: 16, paddingBottom: 60}}>
                    <AssetsLocalWidget onPress={this.setAsset}/>
                    <FooterBtn title={f`Find in Era`} onPress={this.searchAssets}/>
                </View>
            </View>
        );
    }

    @bind
    protected back(): any {
        stores.navigationStore.navigate("Send");
        return true;
    }
}

interface ISentProps extends INavigationProps {
}

interface ISentState {

}
