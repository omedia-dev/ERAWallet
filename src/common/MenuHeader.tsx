import React, {Component} from "react";
import {Animated, Image, TouchableOpacity, View} from "react-native";
import {styles} from "../styles";
import {stores} from "../core/stores/Stores";
import {observer} from "mobx-react";
import {ImageResources} from "./ImageRecources.g";
import Text = Animated.Text;
import {f} from "./t";

@observer
export class MenuHeader extends Component<IMenuHeaderProps, IMenuHeaderState> {

    private myAccount = () => {
        if (stores.accountStore.profile && stores.accountStore.profile.isAuthorized) {
            stores.navigationStore.navigate("MyProfile");
        } else {
            stores.navigationStore.navigate("Registration");
        }
    };

    constructor(props: IMenuHeaderProps) {
        super(props);

        this.state = {imageLoading: true};
    }

    async componentWillMount(): Promise<void> {
        await stores.accountStore.loadProfile();
    }

    render(): JSX.Element {
        const profile = stores.accountStore.profile;
        const userKey = profile && profile.key ? `№${profile.key}` : "";
        const status = profile && profile.isAuthorized ? f`confirmed person` : f`unconfirmed person`;

        return (
            <View>
                <TouchableOpacity onPress={this.myAccount} activeOpacity={0.95}>
                    <Image style={styles.menu.backgroundImage} source={ImageResources.image}/>
                    <View style={styles.menu.backgroundEmpty}>
                        <View style={styles.menu.textContainer}>
                            {userKey ? <Text style={styles.menu.userKey}>{userKey}</Text> : null}
                            <Text style={styles.menu.userName}>{this.renderName()}</Text>
                            <Text style={styles.menu.userStatus}>{status}</Text>
                        </View>
                    </View>
                    <View style={styles.menu.userView}>
                        <View>
                            {this.renderAvatar()}
                            {/*<Image style={styles.menu.userEditButton} source={ImageResources.icon_user_edit}/>*/}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    private renderName(): string {
        const profile = stores.accountStore.profile;

        if (!profile) {
            return f`receiving profile`;
        }

        if (profile.isAuthorized === false) {
            return f`anonimous person`;
        }

        return profile.name;
    }

    private renderAvatar(): JSX.Element | null {
        const profile = stores.accountStore.profile;
        if (!profile || !profile.isAuthorized) {
            return <Image source={ImageResources.no_avatar} style={styles.menu.userImage}/>;
        }

        return <Image source={{uri: profile.imageUri}} style={styles.menu.userImage}/>;
    }
}

interface IMenuHeaderProps {
}

interface IMenuHeaderState {
}

