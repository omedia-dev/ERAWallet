import React, {Component} from "react";
import {Image, View} from "react-native";
import {primaryColorLight, styles} from "../styles";
import {NavigationBar} from "../common/NavigationBar";
import {ImageResources} from "../common/ImageRecources.g";
import {InfoItem} from "../common/InfoItem";
import {Btn} from "../common/Btn/Btn";
import {f} from "../common/t";

export class MyContacts extends Component<IMyContactsProps, IMyContactsState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private back = () => {
        this.props.navigation && this.props.navigation.goBack();
    };
    private favorite = () => {
        this.setState({favorite: !this.state.favorite});
    };
    private sent = () => {
        this.props.navigation && this.props.navigation.navigate("UserProfile");
    };

    componentWillMount(): void {
        this.setState({favorite: false});
    }

    render(): JSX.Element {
        return (
            <View style={styles.myContacts.container}>
                <Image source={ImageResources.background} style={styles.myContacts.topBackgroundImage}/>
                <NavigationBar
                    title={f`Yours contacts`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                    rightButton={this.state.favorite ? ImageResources.icon_favorit_active : ImageResources.icon_favorite}
                    onRightButtonPress={this.favorite}
                />
                {/*<ContactInfo*/}
                {/*avatar={"http://www.tamaplus.sk/wp-content/uploads/2012/07/avatar.jpg"}*/}
                {/*name={"Инна Олеговна"}*/}
                {/*age={"24 года"}*/}
                {/*city={"Москва"}*/}
                {/*avatarLoaded={true}*/}
                {/*/>*/}
                <View style={styles.myContacts.contentContainer}>
                    <InfoItem
                        title={f`User address`}
                        value={"jdhvdd845483hjfdbfd6863bnfbdk38"}
                    />
                    <View style={styles.shared.line}/>

                </View>
                <View style={styles.myContacts.buttonsContainer}>
                    <View style={styles.myContacts.formRow}>
                        <Btn fill={true} title={f`Send transfer`} onPress={this.sent} fillColor={primaryColorLight}/>
                    </View>
                    <View style={styles.myContacts.formRow}>
                        {/*<Btn fill={true} title={f`Remove from contacts list`} onPress={this.remove}/>*/}
                    </View>
                </View>

            </View>
        );
    }
}

interface IMyContactsProps extends INavigationProps {
}

interface IMyContactsState {
    favorite: boolean;
}
