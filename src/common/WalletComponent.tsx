import React, {Component} from "react";
import {Clipboard, Image, LayoutChangeEvent, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../styles";
import {InfoItem} from "./InfoItem";
import {stores} from "../core/stores/Stores";
import {observer} from "mobx-react";
import {f} from "./t";
import {ImageResources} from "./ImageRecources.g";
import {FlexDirection, JustifyContent} from "../types/RNStyles";
import {BottomMenu, IBottomMenuActions} from "./BottomMenu";
import Toast from "react-native-simple-toast";
import {PredefinedAssets} from "../core/stores/AssetsStore";

// const dWidth = Dimensions.get("window").width;

@observer
export class WalletComponent extends Component<IWalletComponentProps, IWalletComponentState> {
    private showAssets = () => {
        if (stores.assetsStore.favorite.length === 0) {
            Toast.show(f`no fav assets`);
        } else {
            this.setState({showAssets: true});
        }
    };

    private setAssetContWidth = (e: LayoutChangeEvent) => {
        this.setState({assetContWidth: e.nativeEvent.layout.width}, () => this.setAssetNameWidth());
    };

    private setAssetAmountWidth = (e: LayoutChangeEvent) => {
        this.setState({assetAmountWidth: e.nativeEvent.layout.width}, () => this.setAssetNameWidth());
    };

    private setAssetNameWidth = () => {
        if (this.state.assetAmountWidth && this.state.assetContWidth) {
            this.setState({assetNameWidth: this.state.assetContWidth - this.state.assetAmountWidth - (8 * 4) - 12});
        }
    };

    private refresh = () => {
        stores.accountStore.profile && stores.accountStore.profile.resetBalance();
        stores.walletStore.refreshHistory();
    };

    private showSelect = () => {
        this.setState({showSelect: true});
    };

    private closeMenu = () => {
        this.setState({showSelect: false, showAssets: false});
    };

    private copyAccount = () => {
        Clipboard.setString(stores.localWallet.address);
        Toast.show(f`Copied to clipboard`);
        this.closeMenu();
    };

    private copyKey = async () => {
        const keys = await stores.localWallet.keys.toString();
        Clipboard.setString(keys.publicKey);
        Toast.show(f`Copied to clipboard`);
        this.closeMenu();
    };

    constructor(props: IWalletComponentProps) {
        super(props);

        this.state = {
            showSelect: false,
            showAssets: false,
            actions: [],
            assetAmountWidth: 100,
            assetNameWidth: 0,
            assetContWidth: 100,
        };
    }

    async componentDidMount(): Promise<void> {
        await stores.assetsStore.loadAssets();
        const assetsMenuItems: IBottomMenuActions[] = stores.assetsStore.favorite.map(asset => ({
            name: asset.name,
            action: () => {
                stores.walletStore.selectedAsset = asset.key;
                this.refresh();
                this.closeMenu();
            },
        }));

        this.setState({actions: assetsMenuItems});
    }

    render(): JSX.Element {
        const balance = this.renderBalance();
        const historyStyle = {...styles.infoItem.container, height: 50};
        const lable = stores.walletStore.history.length > 0 ?
            null :
            <Text style={styles.myWallet.noHistoryText}>{f`no records`}</Text>;
        const self = this;

        return (
            <View style={styles.container}>
                <BottomMenu
                    visible={this.state.showSelect}
                    actions={[
                        {
                            name: f`Copy account`,
                            action() {
                                self.copyAccount();
                            }
                        },
                        {
                            name: f`Copy open key`,
                            action() {
                                self.copyKey();
                            }
                        },
                    ]}
                    onClose={this.closeMenu}
                />
                <BottomMenu
                    visible={this.state.showAssets}
                    actions={this.state.actions}
                    onClose={this.closeMenu}
                />

                <View style={styles.myWallet.balanceContainer}>
                    {balance}
                    <TouchableOpacity onPress={this.refresh} style={styles.myWallet.refreshButton}>
                        <Image style={styles.myWallet.refreshImage} source={ImageResources.icon_refresh}/>
                    </TouchableOpacity>
                </View>
                <InfoItem
                    title={f`Yours correct address`}
                    value={stores.localWallet.address}
                    onPress={this.showSelect}
                />
                <View style={styles.shared.line}/>
                <View style={historyStyle}>
                    <Text style={styles.infoItem.title}>{f`Transactions history`}</Text>
                </View>
                <View>{lable}</View>
            </View>
        );
    }

    renderBalance(): JSX.Element | null {
        const items: JSX.Element [] = [];

        const asset = stores.assetsStore.assets.get(stores.walletStore.selectedAsset.toString());
        if (asset) {
            items.push(
                <TouchableOpacity onPress={this.showAssets} style={styles.myWallet.textSubContainer} key={asset.key} onLayout={this.setAssetContWidth}>
                    <View style={{...styles.myWallet.textsubSubContainer, paddingRight: 8}}>
                        <Text style={{
                            ...styles.myWallet.currencyNameBottom,
                            maxWidth: this.state.assetNameWidth
                        }} numberOfLines={1}>{asset.name}</Text>
                        <Text style={styles.myWallet.currencyValueBottom} onLayout={this.setAssetAmountWidth}>{asset.fixedAmount}</Text>
                    </View>
                    <Image style={styles.myWallet.dropDownIcon} source={ImageResources.icon_list}/>
                </TouchableOpacity>);
        }

        const compu = stores.assetsStore.favorite.find(asset => asset.key === PredefinedAssets.Compu);
        if (compu) {
            items.push(
                <View style={{
                    ...styles.myWallet.textSubContainer,
                    borderWidth: 0,
                    flexDirection: FlexDirection.row,
                    justifyContent: JustifyContent.flexStart
                }} key={0}>
                    <Text style={{...styles.myWallet.currencyNameBottom, ...{fontSize: 18}}}>{compu.name}</Text>
                    <Text style={{...styles.myWallet.currencyValueBottom, ...{fontSize: 18}}}>{compu.fixedAmount}</Text>
                </View>);
        }

        return items.length > 0 ? ( <View style={{flex: 1, marginRight: 16}}>{items}</View>) : null;
    }
}

interface IWalletComponentProps {
}

interface IWalletComponentState {
    showSelect: boolean;
    showAssets: boolean;
    actions: IBottomMenuActions[];
    assetAmountWidth: number;
    assetNameWidth: number;
    assetContWidth: number;
}
