import React, {Component} from "react";
import {Clipboard, Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../styles";
import {ImageResources} from "./ImageRecources.g";
import {BottomMenu} from "./BottomMenu";
import {AlignItems, JustifyContent} from "../types/RNStyles";
import {stores} from "../core/stores/Stores";
import {EraPerson} from "../core/stores/era/EraPerson";
import {Toaster} from "./Toaster";
import {observer} from "mobx-react";
import {f} from "./t";

@observer
export class UserAccountsPanel extends Component<IUserAccountsPanelProps, IUserAccountsPanelState> {
    private toggle = () => {
        this.setState({visible: !this.state.visible});
    };

    private send = (recipient: string) => {
        stores.sendStore.recipient = this.props.profile;
        stores.navigationStore.navigate("Send");
    };

    private copy = (account: string) => {
        Clipboard.setString(account);
        Toaster.error(f`Copied to clipboard`);
    };

    constructor(props: IUserAccountsPanelProps) {
        super(props);

        this.state = {visible: false};
    }

    render(): JSX.Element {
        if (!this.props.profile || !this.props.profile.accounts || !this.props.profile.accounts.length) {
            return <View/>;
        }

        const imageStyle = {
            transform: [{rotate: this.state.visible ? "90deg" : "0deg"}]
        };

        return (
            <View>
                <TouchableOpacity style={styles.userDataPanel.container} onPress={this.toggle}>
                    <Text style={styles.userDataPanel.title}>{f`Accounts`}</Text>
                    <Image style={imageStyle} source={ImageResources.icon_list_blue}/>
                </TouchableOpacity>
                <View style={styles.shared.line}/>
                {this.state.visible ? ( <View style={styles.userDataPanel.dataRow}>{this.renderAccounts()}</View> ) : null}
            </View>
        );
    }

    private renderAccounts() {
        const self = this;
        const accounts = (this.props.profile && this.props.profile.accounts) || [];
        const actions = accounts.map(account => {
            return {
                account,
                actions: [
                    {
                        name: f`Send active`,
                        action() {
                            self.send(account);
                        },
                    }, {
                        name: f`Copy account`,
                        action() {
                            self.copy(account);
                        },
                    },
                ]
            };
        });

        return actions.map((acc, n) => {
            return (
                <BottomMenu actions={acc.actions} key={n}>
                    <View style={{
                        paddingLeft: 24,
                        alignItems: AlignItems.stretch,
                        justifyContent: JustifyContent.center
                    }}>
                        <View style={{
                            height: 50,
                            borderBottomWidth: 1,
                            borderBottomColor: "#EEF1F5",
                            justifyContent: JustifyContent.center
                        }}>
                            <Text numberOfLines={1}
                                  style={{...styles.userDataPanel.account, ...{color: "#728196"}}}>{n + 1}. {acc.account}</Text>
                        </View>
                    </View>
                </BottomMenu>
            );
        });
    }
}

interface IUserAccountsPanelProps {
    profile: EraPerson
}

interface IUserAccountsPanelState {
    visible: boolean;
}
