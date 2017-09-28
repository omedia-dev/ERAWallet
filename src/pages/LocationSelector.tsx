import React from "react";
import {Image, TextStyle, View, ViewStyle} from "react-native";
import {styles, textPlaceholderColor} from "../styles";
import {NavigationBar} from "../common/NavigationBar";
import {ImageResources} from "../common/ImageRecources.g";
import {LocationItem} from "../common/LocationItem";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {settings} from "../core/settings/AppSettings";
import {stores} from "../core/stores/Stores";
import {f} from "../common/t";
import {BackHandled} from "../common/BackHandled";

export class LocationSelector extends BackHandled<ILocationSelectorProps, ILocationSelectorState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private onBack = () => {
        stores.navigationStore.goBack();
    };
    private onPress = (data: any, details: any) => {
        stores.locationStore.newLocation = {data, details};
        this.onBack();
    };
    private renderRow = (data: any) => {
        return (
            <LocationItem
                title={data.structured_formatting.main_text}
                subtitle={data.structured_formatting.secondary_text}
            />);
    };
    private renderImage = () => {
        return (
            <Image style={styles.geo.searchImage} source={ImageResources.icon_search}/>);
    };
    private rowDesc = (row: any) => {
        return row.description;
    };
    private defaultValue = () => {
        return "";
    };

    componentWillMount(): void {
        stores.locationStore.newLocation = undefined;
    }

    render(): JSX.Element | any | any {
        const params = this.props.navigation && this.props.navigation.state.params && this.props.navigation.state.params || {};
        const {placeholder, predefined} = params;

        return (
            <View style={styles.geo.container}>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`Select place`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.onBack}
                />
                <View style={styles.geo.contentContainer}>
                    <GooglePlacesAutocomplete
                        placeholder={placeholder}
                        placeholderTextColor={textPlaceholderColor}
                        minLength={2}
                        autoFocus={false}
                        returnKeyType={"search"}
                        listViewDisplayed="auto"
                        fetchDetails={true}
                        onPress={this.onPress}
                        getDefaultValue={this.defaultValue}
                        query={{key: settings.googleMapApiKey, language:stores.localizationStore.currentLang, types: "(cities)"}}
                        debounce={settings.locationSelectorDebounce}
                        renderLeftButton={this.renderImage}
                        renderDescription={this.rowDesc}
                        renderRow={this.renderRow}
                        predefinedPlaces={predefined}
                        styles={style}
                    />
                </View>
            </View>
        );
    }
}

const style = {
    container: {
        alignItems: "center",
    } as ViewStyle,
    description: {} as TextStyle,
    textInputContainer: {
        backgroundColor: "transparent",
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        margin: 0,
        padding: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        ...styles.geo.searchContainer
    } as ViewStyle,
    textInput: {
        marginVertical: 0,
        marginHorizontal: 0,
        margin: 0,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: "transparent",
        ...styles.geo.searchText,
    },
    row: {
        padding: 0,
        height: undefined,
        paddingHorizontal: 10,
    } as ViewStyle,
    loader: {opacity: 0} as ViewStyle,
    listView: {} as ViewStyle,
    poweredContainer: {
        width: 0,
        height: 0,
    } as ViewStyle,
    powered: {
        width: 0,
        height: 0,
    } as ViewStyle,
    separator: {...styles.shared.line} as ViewStyle,
};

interface ILocationSelectorProps extends INavigationProps {
}

interface ILocationSelectorState {
    location: string;
}
