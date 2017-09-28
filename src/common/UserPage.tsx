import React, {Component} from "react";
import {ScrollView, View} from "react-native";
import {styles} from "../styles";
import {ContactInfo} from "./ContactInfo";
import {EraPerson} from "../core/stores/era/EraPerson";
import {UserAccountsPanel} from "./UserAccountsPanel";
import {UserDataPanel} from "./UserDataPanel";

export class UserPage extends Component<IUserPageProps, IUserPageState> {
    constructor(props: IUserPageProps) {
        super(props);
    }

    render(): JSX.Element {
        const profile = this.props.profile;
        return (
            <View style={{flex: 1}}>
                <ContactInfo profile={profile}/>

                <ScrollView showsVerticalScrollIndicator={false}
                            contentContainerStyle={{...styles.userProfile.contentContainer}}>
                    <UserDataPanel profile={profile}/>
                    <View style={styles.shared.line}/>
                    <UserAccountsPanel profile={profile}/>
                </ScrollView>

                {this.props.btn ? <View style={styles.myWallet.bottomContainer}>{this.props.btn}</View> : null}
            </View>
        );
    }
}

interface IUserPageProps {
    profile: EraPerson;
    btn?: JSX.Element;
}

interface IUserPageState {

}
