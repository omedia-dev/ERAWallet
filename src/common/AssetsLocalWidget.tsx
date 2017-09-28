import React, {Component} from "react";
import {ScrollView, Text, TextStyle, View, ViewStyle} from "react-native";
import {stores} from "../core/stores/Stores";
import {secondaryColor} from "../styles";
import {FontNames} from "./FontNames";
import {observer} from "mobx-react";
import {EraAsset} from "../core/stores/era/EraAsset";
import {AssetItemLocal} from "./AssetItemLocal";
import {EmptyFavorites} from "./EmptyFavorites";
import {f} from "./t";

@observer
export class AssetsLocalWidget extends Component<IAssetsLocalWidgetProps, IAssetsLocalWidgetState> {
    private onPress = (asset: EraAsset) => {
        return () => {
            this.props.onPress && this.props.onPress(asset);
        };
    };

    constructor(props: IAssetsLocalWidgetProps) {
        super(props);
        this.state = {};
    }

    async componentDidMount(): Promise<void> {
        const assets = await stores.assetsStore.loadAssets();
        this.setState({assets});
    }

    render(): JSX.Element {
        return <ScrollView contentContainerStyle={{paddingBottom: 60}}>
            {this.renderNotFound()}
            {this.renderFavorite()}
        </ScrollView>;
    }

    private renderNotFound() {
        if (stores.assetsStore.favorite.length === 0) {
            return <EmptyFavorites message={f`message_3`}/>;
        } else {
            return null;
        }
    }

    private renderFavorite() {
        if (!this.state.assets || !this.state.assets.length || !stores.assetsStore.favorite.length) {
            return null;
        }

        return (
            <View style={style.fav.container}>
                <Text style={style.fav.title}>{f`Favorite`}</Text>
                {stores.assetsStore.favorite.map((asset, n) => this.renderItem(asset, n, true))}
            </View>
        );
    }

    private renderItem(asset: EraAsset, n: number, favorite: boolean = false) {
        return (
            <AssetItemLocal key={n} asset={asset} favorite={favorite} onPress={this.props.onPress && this.onPress(asset)}/> );
    }
}

const style = {
    container: {padding: 16} as ViewStyle,
    fav: {
        container: {} as ViewStyle,
        title: {
            fontFamily: FontNames.ProstoLight,
            fontSize: 20,
            color: secondaryColor,
            marginBottom: 16,
            marginTop: 8
        } as TextStyle
    },
};

interface IAssetsLocalWidgetProps {
    onPress?: (asset: EraAsset) => void;
}

interface IAssetsLocalWidgetState {
    assets?: EraAsset[];
    showMenu?: EraAsset | null;
}
