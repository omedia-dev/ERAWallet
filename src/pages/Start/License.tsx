import React from "react";
import {Image, Text, TouchableOpacity, View, ViewStyle, WebView} from "react-native";
import {styles} from "../../styles";
import {observer} from "mobx-react";
import {bind} from "../../types/autobind";
import {stores} from "../../core/stores/Stores";
import {BackHandled} from "../../common/BackHandled";
import {f} from "../../common/t";
import {ImageResources} from "../../common/ImageRecources.g";
import {NavigationBar} from "../../common/NavigationBar";
import {RU} from "../../core/stores/LocalizationStore";

@observer
export class License extends BackHandled<ILicenseProps, ILicenseState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false,
    };
    private accept = () => {
        this.setState({acepted: !this.state.acepted});
    };
    private navigateToFirstLogin = () => {
        stores.navigationStore.navigate("FirstLogin");
    };

    componentWillMount(): void {
        this.setState({acepted: false});
    }

    render(): JSX.Element {
        const license = stores.localizationStore.currentLang === RU ? require("../../../resources/license/ru.json") : require("../../../resources/license/en.json");
        const source = {html: license.html};

        const containerStyle: ViewStyle = {
            ...styles.login.containerBottomLicence,
            justifyContent: "space-around",
        };
        const square = this.state.acepted ? (
            <View style={styles.register.square}/>) : null;
        const nextButton = this.state.acepted ? (
            <View style={styles.login.bottomContainer}>
                <TouchableOpacity onPress={this.navigateToFirstLogin} style={styles.register.buttonContinue}
                                  activeOpacity={0.9}>
                    <Text style={styles.register.buttonText}>{f`Next`}</Text>
                </TouchableOpacity>
            </View>) :
            <View style={styles.login.bottomContainer}>
                <View style={{...styles.register.buttonContinue, ...{backgroundColor: "#D1D5DB"}}}>
                    <Text style={styles.register.buttonNextDisabledText}>{f`Next`}</Text>
                </View>
            </View>;

        return (
            <View style={styles.container}>
                {/*<View style={styles.login.containerTop}>*/}
                {/*<LargeLogo>*/}
                {/*/!*<BackBtn float={true} onPress={this.back}/>*!/*/}
                {/*</LargeLogo>*/}
                {/*</View>*/}
                <Image source={ImageResources.background} style={styles.myContacts.topBackgroundImage}
                       resizeMode="cover"/>
                <NavigationBar
                    title={f`License`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                />
                <View style={containerStyle}>
                    <Text style={styles.register.liceseText}>{f`License Text`}</Text>
                    <View style={styles.login.web}>
                        <WebView source={source}/>
                    </View>
                    <TouchableOpacity onPress={this.accept} style={styles.register.aceptContainer}>
                        <View style={styles.register.aceptSquareBorder}>{square}</View>
                        <Text style={styles.register.aceptText}>{f`I Accept`}</Text>
                    </TouchableOpacity>

                </View>
                {nextButton}
            </View>
        );
    }

    @bind
    protected back(): true {
        stores.navigationStore.navigate("CreateWallet");
        return true;
    }
}

interface ILicenseProps extends INavigationProps {
}

interface ILicenseState {
    acepted: boolean;

}
