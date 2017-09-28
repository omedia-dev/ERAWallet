import React, {Component} from "react";
import {Image, ImageStyle, LayoutChangeEvent, Text, TextStyle, View, ViewStyle} from "react-native";
import {AlignItems, FlexDirection, JustifyContent} from "../types/RNStyles";
import {FontNames} from "./FontNames";
import {dWidth, primaryColorLight, styles, textPlaceholderColor} from "../styles";
import {EraAsset} from "../core/stores/era/EraAsset";
import {ImageResources} from "./ImageRecources.g";

export class AssetItemRemote extends Component<IAssetItemProps, IAssetItemState> {
    private setAssetBalanceWidth = (e: LayoutChangeEvent) => {
        const assetNameWidth = dWidth - e.nativeEvent.layout.width - (16 * 2) - 18 - 12 - 30;
        this.setState({assetNameWidth});
    };

    constructor(props: IAssetItemProps) {
        super(props);

        this.state = {assetNameWidth: 100};
    }

    componentWillMount(): void {
        this.loadIcon();
    }

    render(): JSX.Element {
        const asset = this.props.asset;
        const source = this.state.icon ? {uri: this.state.icon} : ImageResources.icon_asset;

        return (
            <View style={style.container}>
                <View style={style.containerLeft}>
                    <Image source={source} style={style.icon}/>
                    <Text numberOfLines={1} style={{
                        ...style.name,
                        maxWidth: this.state.assetNameWidth
                    }}>{asset.name}</Text>
                </View>
                <View style={style.containerRight}>
                    <Text style={style.balance} onLayout={this.setAssetBalanceWidth}>{asset.fixedAmount}</Text>
                </View>
            </View>
        );
    }

    private async loadIcon() {
        this.setState({icon: await this.props.asset.getIconPath()});
    }
}

const style = {
    container: {
        flexDirection: FlexDirection.row,
        justifyContent: JustifyContent.spaceBetween,
        alignItems: AlignItems.center,
        height: 40,
        ...styles.shared.hr,
    } as ViewStyle,
    containerLeft: {flexDirection: FlexDirection.row} as ViewStyle,
    containerRight: {flexDirection: FlexDirection.row} as ViewStyle,
    icon: {width: 18, height: 18, marginRight: 12} as ImageStyle,
    name: {fontFamily: FontNames.ProstoRegular, color: textPlaceholderColor, fontSize: 14} as TextStyle,
    balance: {fontFamily: FontNames.ProstoRegular, color: primaryColorLight, fontSize: 14} as TextStyle,
};

interface IAssetItemProps {
    asset: EraAsset;
}

interface IAssetItemState {
    icon?: string | null;
    assetNameWidth: number;
}
