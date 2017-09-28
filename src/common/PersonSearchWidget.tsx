import React, {Component} from "react";
import {FlatList, Image, TextInput, TouchableOpacity, View} from "react-native";
import {NothingFound} from "../pages/NothingFound";
import {stores} from "../core/stores/Stores";
import {LightLoading} from "./LightLoading";
import {styles, textPlaceholderColor} from "../styles";
import {ImageResources} from "./ImageRecources.g";
import {UserListItem} from "./UserListItem";
import {EraPerson} from "../core/stores/era/EraPerson";
import {observer} from "mobx-react";
import {f} from "./t";

@observer
export class PersonSearchLocalWidget extends Component<IPersonSearchWidgetProps, IPersonSearchWidgetState> {

    private renderItem = ({item}: { item: EraPerson }) => {
        return (
            <TouchableOpacity onPress={this.favPress(item)}><UserListItem person={item}/></TouchableOpacity>
        );
    };

    private keyExtractor = (item: EraPerson) => {
        return item.key.toString();
    };

    private onTextChange = (text: string) => {
        this.setState({searchRequest: text});
        if (!text.length) {
            this.setState({searchResult: stores.personsStore.favorites});
            return;
        }

        this.setState({loading: true, searchResult: []});
        const searchResult = stores.personsStore.favoritesFilter(text);
        this.setState({loading: false, searchResult});
    };

    constructor(props: IPersonSearchWidgetProps) {
        super(props);
        this.state = {searchRequest: "", loading: false, searchResult: stores.personsStore.favorites};
    }

    render(): JSX.Element {
        const searchData = this.state.searchResult.length ? this.state.searchResult : stores.personsStore.favorites;

        let search;
        if (!stores.personsStore.favorites) {
            search = <NothingFound message={f`message_6`}/>;
        } else if (!this.state.searchResult.length) {
            search = <NothingFound message={f`message_7`}/>;
        } else if (searchData.length > 0) {
            search = <View style={styles.search.usersListContainer}>
                <FlatList
                    data={this.state.searchResult}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    contentContainerStyle={{paddingHorizontal: 8}}
                />
            </View>;
        }

        return (
            <View style={{...styles.search.container,...{paddingHorizontal: 16}}}>
                <View style={styles.search.searchContainer}>
                    <TextInput
                        placeholder={f`Find in Fav`}
                        placeholderTextColor={textPlaceholderColor}
                        value={this.state.searchRequest}
                        onChangeText={this.onTextChange}
                        style={styles.search.searchTextInput}
                        underlineColorAndroid={"transparent"}
                        autoFocus={true}
                    />
                    <Image style={styles.search.searchIcon} source={ImageResources.icon_search}/>
                </View>
                    {search}
                {this.state.loading ? <LightLoading/> : null}
            </View>
        );
    }

    private favPress(item: EraPerson): () => void {
        return () => this.props.onPress && this.props.onPress(item);
    }
}

interface IPersonSearchWidgetProps {
    onPress: (person: EraPerson) => void;
    title?: string;
}

interface IPersonSearchWidgetState {
    searchRequest: string;
    loading: boolean;
    searchResult: EraPerson[];
}
