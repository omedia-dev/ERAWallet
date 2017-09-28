import React, {Component} from "react";
import {FlatList, Image, TextInput, TouchableOpacity, View} from "react-native";
import {LightLoading} from "./LightLoading";
import {ImageResources} from "./ImageRecources.g";
import {styles, textPlaceholderColor} from "../styles";
import {NothingFound} from "../pages/NothingFound";
import {stores} from "../core/stores/Stores";
import {UserListItem} from "./UserListItem";
import {EraPerson} from "../core/stores/era/EraPerson";
import {observer} from "mobx-react";
import {f} from "./t";

@observer
export class PersonSearchRemoteWidget extends Component<IPersonSearchRemoteWidgetProps, IPersonSearchRemoteWidgetState> {
    private renderItem = ({item}: { item: EraPerson }) => {
        return (
            <TouchableOpacity onPress={this.onPress(item)}>
                <UserListItem person={item}/>
            </TouchableOpacity>
        );
    };
    private keyExtractor = (item: EraPerson) => {
        return item.key.toString();
    };
    private onTextChange = async (text: string) => {
        this.setState({searchRequest: text, loading: true});
        const searchResult = await stores.personsStore.searchPersons(text);
        this.setState({loading: false, searchResult});
    };
    private onPress = (key: EraPerson) => {
        return async () => {
            this.props.onPress && this.props.onPress(key);
        };
    };

    constructor(props: IPersonSearchRemoteWidgetProps) {
        super(props);
        this.state = {searchRequest: "", loading: false, searchResult: []};
    }

    render(): JSX.Element {
        const searchData = this.state.searchResult;
        const search = searchData.length > 0 ? (
            <View style={styles.search.usersListContainer}>
                <FlatList
                    data={this.state.searchResult}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    contentContainerStyle={{paddingHorizontal: 8}}
                />
            </View>) : (this.state.searchRequest.length > 2 && !this.state.loading ? (<NothingFound/>) : null);

        return (
            <View style={{...styles.search.container,...{paddingHorizontal: 16}}}>
                <View style={styles.search.searchContainer}>
                    <TextInput
                        placeholder={f`Search persons in Erachain`}
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
}

interface IPersonSearchRemoteWidgetProps {
    onPress: (profile: EraPerson) => void;
}

interface IPersonSearchRemoteWidgetState {
    searchRequest: string;
    searchResult: EraPerson[];
    loading: boolean;
}
