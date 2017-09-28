import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react";
import {stores} from "../../../core/stores/Stores";
import {ImageResources} from "../../../common/ImageRecources.g";
import {styles} from "../../../styles";
import {NavigationBar} from "../../../common/NavigationBar";
import {UserPage} from "../../../common/UserPage";
import {bind} from "../../../types/autobind";
import {EraPerson} from "../../../core/stores/era/EraPerson";
import {BackHandled} from "../../../common/BackHandled";
import {f} from "../../../common/t";

@observer
export class SendUserPreview extends BackHandled<IUserPreviewProps, IUserPreviewState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private favorite = () => {
        if (this.state.profile) {
            stores.personsStore.toggleFavorite(this.state.profile.key);
        }
    };
    private send = () => {
        if (this.state.profile) {
            stores.sendStore.recipient = this.state.profile;
            this.back();
        }
    };

    constructor(props: IUserPreviewProps, context: any) {
        super(props, context);
        this.state = {};
    }

    componentDidMount() {
        super.componentDidMount();

        const profile = stores.navigationStore.params.person;
        if (profile) {
            this.setState({profile});
        } else {
            this.back();
        }
    }

    render(): JSX.Element {
        const profile = this.state.profile;
        if (!profile) {
            return <View/>;
        }

        const startUri = profile.favorite ? ImageResources.icon_favorit_active : ImageResources.icon_favorite;

        const btns = (
            <TouchableOpacity onPress={this.send} style={styles.myWallet.buttonLeft} activeOpacity={0.9}>
                <Text style={styles.myWallet.buttonText}>{f`Sent`}</Text>
            </TouchableOpacity>
        );

        return (
            <View style={styles.myContacts.container}>
                <Image source={ImageResources.background} style={styles.myContacts.topBackgroundImage}/>
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
        stores.navigationStore.navigate("Send");
        return true;
    }
}

interface IUserPreviewProps extends INavigationProps {
}

interface IUserPreviewState {
    profile?: EraPerson ;
}
