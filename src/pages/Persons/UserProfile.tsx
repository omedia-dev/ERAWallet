import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../styles";
import {NavigationBar} from "../../common/NavigationBar";
import {bind} from "../../types/autobind";
import {ImageResources} from "../../common/ImageRecources.g";
import {stores} from "../../core/stores/Stores";
import {observer} from "mobx-react";
import {f} from "../../common/t";
import {UserPage} from "../../common/UserPage";
import {EraPerson} from "../../core/stores/era/EraPerson";
import {BackHandled} from "../../common/BackHandled";

@observer
export class UserProfile extends BackHandled<IUserProfileProps, IUserProfileState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private favorite = () => {
        if (this.state.profile) {
            stores.personsStore.toggleFavorite(this.state.profile.key);
        }
    };

    constructor(props: IUserProfileProps, context: any) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        super.componentDidMount();
        const profile = stores.personsStore.persons.get(stores.navigationStore.params.profileKey);
        this.setState({profile});
    }

    render(): JSX.Element {
        const profile = this.state.profile;
        if (!profile) {
            return <View/>;
        }

        const btnText = profile.favorite ? f`RemoveFromFavorite` : f`AddToFavorite`;
        const startUri = profile.favorite ? ImageResources.icon_favorit_active : ImageResources.icon_favorite;

        const btns = (
            <TouchableOpacity onPress={this.favorite} style={styles.myWallet.buttonLeft} activeOpacity={0.9}>
                <Text style={styles.myWallet.buttonText}>{btnText}</Text>
            </TouchableOpacity>
        );

        return (
            <View style={styles.myContacts.container}>
                <Image source={ImageResources.image} style={styles.myContacts.topBackgroundImage}/>
                <NavigationBar
                    title={f`Person profile`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                    rightButton={startUri}
                    onRightButtonPress={this.favorite}
                />
                <UserPage btn={btns} profile={profile}/>
            </View>
        );
    }

    @bind
    protected back(): any {
        stores.navigationStore.navigate("PersonsLocal");
        return true;
    }
}

interface IUserProfileProps extends INavigationProps {
}

interface IUserProfileState {
    profile?: EraPerson ;
}
