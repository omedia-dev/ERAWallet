import React from "react";
import {FlatList, Image, TextInput, TouchableOpacity, View, ViewStyle} from "react-native";
import {styles, textPlaceholderColor} from "../../styles";
import {ImageResources} from "../../common/ImageRecources.g";
import {NavigationBar} from "../../common/NavigationBar";
import {BackHandled} from "../../common/BackHandled";
import {stores} from "../../core/stores/Stores";
import {LightLoading} from "../../common/LightLoading";
import {AssetItemRemote} from "../../common/AssetItemRemote";
import {IEraAssetWithIcon} from "../../core/stores/AssetsStore";
import {NothingFound} from "../NothingFound";
import {EraAsset} from "../../core/stores/era/EraAsset";
import {observer} from "mobx-react";
import {bind} from "../../types/autobind";
import {f} from "../../common/t";

@observer
export class AssetsRemote extends BackHandled<ISearchAssetsProps, ISearchAssetsState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    keyExtractor = (item: IEraAssetWithIcon, index: number): string => index.toString();
    renderItem = ({item}: { item: EraAsset }): JSX.Element => {
        return (
            <TouchableOpacity onPress={this.addFavorite(item)}>
                <AssetItemRemote asset={item}/>
            </TouchableOpacity>
        );
    };
    private onTextChange = async (text: string) => {
        this.setState({searchText: text, searchResult: []});

        if (text.length >= 3) {
            this.setState({loading: true});
            const searchResult = await stores.assetsStore.search(text);
            this.setState({loading: false, searchResult});
        }
    };

    constructor(props: ISearchAssetsProps) {
        super(props);
    }

    componentWillMount(): void {
        this.state = {searchText: "", loading: false, searchResult: []};
    }

    render(): JSX.Element {
        const searchData = this.state.searchResult;
        const search = searchData.length > 0 ? (
            <View style={{...styles.search.usersListContainer,...{paddingHorizontal: 16}}}>
                <FlatList
                    data={this.state.searchResult}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
            </View>) : (this.state.searchText.length > 2 && !this.state.loading ? (
            <View style={{paddingHorizontal: 16}}><NothingFound/></View>) : null);

        return (
            <View style={styles.container}>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`Find in Era`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                />

                <View style={style.search.container}>
                    <View style={styles.search.searchContainer}>
                        <TextInput
                            value={this.state.searchText}
                            onChangeText={this.onTextChange}
                            style={styles.search.searchTextInput}
                            underlineColorAndroid={"transparent"}
                            placeholder={f`Find in Era`}
                            placeholderTextColor={textPlaceholderColor}
                            autoFocus={true}
                        />
                        <Image style={styles.search.searchIcon} source={ImageResources.icon_search}/>
                    </View>
                </View>

                {search}

                {this.state.loading ? <LightLoading/> : null}
            </View>
        );
    }

    @bind
    protected back(): any {
        stores.navigationStore.navigate("AssetsLocal");
        return true;
    }

    private addFavorite(item: EraAsset): () => void {
        return () => {
            stores.assetsStore.addFavorite(item.key);
            this.back();
        };
    }
}

const style = {
    search: {
        container: {
            paddingHorizontal: 16
        } as ViewStyle
    },
    result: {
        container: {
            paddingHorizontal: 16,
            flex: 1,
            paddingTop: 17,
        } as ViewStyle
    },
};

interface ISearchAssetsProps {

}

interface ISearchAssetsState {
    searchText: string;
    loading: boolean;
    searchResult: EraAsset[];
}
