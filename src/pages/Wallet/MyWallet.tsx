import React from "react";
import {ActivityIndicator, BackHandler, FlatList, Image, Text, View} from "react-native";
import {bind} from "../../types/autobind";
import {styles, textBorderColor} from "../../styles";
import {NavigationBar} from "../../common/NavigationBar";
import {ImageResources} from "../../common/ImageRecources.g";
import {TransactionHistoryItem} from "../../common/TransactionHistoryItem";
import {stores} from "../../core/stores/Stores";
import {IWalletHistoryItem} from "../../core/stores/WalletStore";
import {observer} from "mobx-react";
import {f} from "../../common/t";
import {WalletComponent} from "../../common/WalletComponent";
import {LineSeparator} from "../../common/LineSeparator";
import {ServerStatusWidget} from "../../common/ServerStatusWidget";
import {BackHandled} from "../../common/BackHandled";
import {FooterBtn} from "../../common/FooterBtn";

@observer
export class MyWallet extends BackHandled<IMyWalletProps, IMyWalletState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };

    private keyExtractor = (item: IWalletHistoryItem, index: number): string => JSON.stringify(item) || index.toString();

    private renderItem = ({item}: { item: IWalletHistoryItem }): JSX.Element => {
        return (
            <TransactionHistoryItem
                index={item.index}
                positive={item.positive}
                sum={item.sum}
                header={item.header}
                dateTime={item.dateTime}
                confirmation={item.confirmation}
                account={item.account}
            />
        );
    };

    private refresh = async () => {
        // stores.accountStore.profile;
        await stores.walletStore.refreshHistory();
    };

    private menu = () => {
        stores.navigationStore.drawerOpen();
    };

    private goToSent = () => {
        stores.navigationStore.navigate("Send");
    };

    constructor(props: IMyWalletProps, context: any) {
        super(props, context);
        this.state = {refreshing: false};
    }

    async componentDidMount(): Promise<void> {
        super.componentDidMount();

        await this.refresh();
    }

    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Image resizeMode={"stretch"} source={ImageResources.background}
                       style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`My wallet`}
                    leftButton={ImageResources.icon_menu}
                    onLeftButtonPress={this.menu}
                    rightWidget={<ServerStatusWidget/>}
                />
                <View style={styles.myWallet.container}>

                    <FlatList
                        ListHeaderComponent={WalletComponent}
                        refreshing={stores.walletStore.refreshing}
                        onRefresh={this.refresh}
                        data={stores.walletStore.history}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={LineSeparator}
                        onEndReached={this.onEndReached}
                    />

                    {stores.walletStore.loading ? <View style={{height: 40, justifyContent: "center"}}><ActivityIndicator animating={true} color={textBorderColor} size={"small"}/></View> : null}

                </View>

                <FooterBtn onPress={this.goToSent}>
                    <Image style={styles.myWallet.buttonImage} source={ImageResources.icon_sent}/>
                    <Text style={styles.myWallet.buttonText}>{f`Sent`}</Text>
                </FooterBtn>
            </View>
        );
    }

    private onEndReached = (): void => {
        stores.walletStore.loadMoreHistory();
    }

    @bind
    protected back(): any {
        BackHandler.exitApp();
        return true;
    }
}

interface IMyWalletProps extends INavigationProps {
}

interface IMyWalletState {
    refreshing: boolean;
}
