import React, {Component} from "react";
import {observer} from "mobx-react";
import {AppNavigator} from "./AppNavigator";
import {addNavigationHelpers} from "react-navigation";
import {stores} from "./core/stores/Stores";
import {NavigationStore} from "./core/stores/NavigationStore";
import {NativeModules, NetInfo, Platform, StatusBar, View} from "react-native";
import {Splash} from "./common/Splash";
import {Provider} from "mobx-react/native";
import {FetchRequest} from "./core/request/FetchRequest";
import {settings} from "./core/settings/AppSettings";
import "./common/polifils";
import Toast from "react-native-simple-toast";
import {f} from "./common/t";
import {PushNotificationManager} from "./common/PushNotificationManager";

export const request = new FetchRequest(settings.baseUrl);

@observer
export class App extends Component<{}, IAppState> {
    private store: NavigationStore;

    constructor(props: {}, context: {}) {
        super(props, context);

        this.state = {mounted: false};
        this.store = stores.navigationStore;
    }

    checkConnection(): void {
        NetInfo.isConnected.addEventListener("change", (hasInternetConnection) => {
            if (!hasInternetConnection)
                Toast.show(f`connection lost`);
        });
    }

    async componentWillMount(): Promise<void> {

        if (Platform.OS === "ios") {
            const l = NativeModules.SettingsManager.settings.AppleLocale;
            try {
                await stores.localizationStore.initLanguages(l);
            } catch (error) {
            }
        }
        if (Platform.OS === "android") {
            const pmm = new PushNotificationManager();
            pmm.register();
            const l = NativeModules.I18nManager.localeIdentifier;
            try {
                await stores.localizationStore.initLanguages(l);
            } catch (error) {
            }
        }


        this.checkConnection();
        await stores.rehydrate();
        const startScreen = await stores.localWallet.walletExists() ? "Login" : "CreateWallet";
        stores.navigationStore.reset(startScreen);
        this.setState({mounted: true});
    }

    render(): JSX.Element {
        const content = this.state.mounted ? <AppNavigator
            navigation={addNavigationHelpers({
                dispatch: this.store.dispatch,
                state: this.store.navigationState
            })}/> : <Splash/>;

        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor={"transparent"} barStyle={"light-content"} translucent={true}/>
                <Provider>
                    {content}
                </Provider>
            </View>
        );
    }
}

interface IAppState {
    mounted: boolean;
}
