import React, {Component} from "react";
import {EraAsset} from "../core/stores/era/EraAsset";
import {Image, ImageStyle, LayoutChangeEvent, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {ImageResources} from "./ImageRecources.g";
import {AlignItems, FlexDirection, JustifyContent} from "../types/RNStyles";
import {FontNames} from "./FontNames";
import {dWidth, primaryColorLight, textPlaceholderColor} from "../styles";
import {BottomMenu, IBottomMenuActions} from "./BottomMenu";
import {stores} from "../core/stores/Stores";
import {observer} from "mobx-react";
import {f} from "./t";

@observer
export class AssetItemLocal extends Component<IAssetLocalItemProps, IAssetLocalItemState> {
    menuActions: IBottomMenuActions[] = [
        {
            name: f`Add Asset To Favorite`,
            action: () => {
                stores.assetsStore.addFavorite(this.props.asset.key);
            },
            visible: () => {
                return !stores.assetsStore.isFavorite(this.props.asset.key);
            }
        },
        {
            name: f`Remove Asset From Favorite`,
            action: () => {
                stores.assetsStore.removeFavorite(this.props.asset.key);
            },
            visible: () => {
                return stores.assetsStore.isFavorite(this.props.asset.key);
            }
        }
    ];

    private setWidth = (e: LayoutChangeEvent) => {
        const assetNameWidth = (dWidth - (16 * 2) - e.nativeEvent.layout.width - 40);
        this.setState({assetNameWidth});
    };

    constructor(props: IAssetLocalItemProps) {
        super(props);
        this.state = {assetNameWidth: 100};
    }

    render(): JSX.Element {
        return (
            <View style={style.asset.container}>
                {this.renderItemText()}
                <View style={style.asset.containerRight}>
                    <BottomMenu actions={this.menuActions}>
                        <View style={style.more.btn}>
                            <Image style={style.more.icon} source={ImageResources.icon_more}/>
                        </View>
                    </BottomMenu>
                </View>
            </View>
        );
    }

    private renderItemText() {
        const asset = this.props.asset;
        const favorite = this.props.favorite;
        const color = favorite ? primaryColorLight : textPlaceholderColor;
        const profile = stores.accountStore.profile;

        if (!profile || !profile.balance) {
            return null;
        }

        const text = <View style={style.asset.containerLeft}>
            <Text numberOfLines={1} style={{
                ...style.asset.name,
                maxWidth: this.state.assetNameWidth,
                color
            }}>{asset.name}</Text>
            <Text onLayout={this.setWidth} style={{
                ...style.asset.amount,
                color
            }}>{asset.fixedAmount}</Text>
        </View>;

        if (this.props.onPress) {
            return <TouchableOpacity onPress={this.props.onPress}>{text}</TouchableOpacity>;
        }

        return text;
    }
}

const style = {
    asset: {
        container: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.spaceBetween,
            height: 40,
        } as ViewStyle,
        containerLeft: {
            flexDirection: FlexDirection.row,
            justifyContent: JustifyContent.center,
        } as ViewStyle,
        containerRight: {marginRight: -8} as ViewStyle,
        name: {
            fontFamily: FontNames.ProstoRegular,
            fontSize: 22,
            color: textPlaceholderColor,
        } as TextStyle,
        amount: {
            fontFamily: FontNames.ProstoLight,
            fontSize: 22,
            color: textPlaceholderColor,
            marginLeft: 4
        } as TextStyle
    },
    more: {
        icon: {
            height: 24,
            width: 24,
        } as ImageStyle,
        btn: {
            height: 40,
            width: 40,
            justifyContent: JustifyContent.center,
            alignItems: AlignItems.center,
        } as ViewStyle
    },
};

interface IAssetLocalItemProps {
    asset: EraAsset;
    favorite?: boolean;
    onPress?: () => void;
}

interface IAssetLocalItemState {
    balance?: number;
    showMenu?: boolean;
    assetNameWidth: number;
}
