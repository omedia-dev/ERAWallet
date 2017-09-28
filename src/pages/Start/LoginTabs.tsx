import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../styles";
import {f} from "../../common/t";

const style = styles.registerTabs;

export class LoginTabs extends Component<IRegisterTabsProps, IRegisterTabsState> {
    render(): JSX.Element {
        const props = this.props;

        const firstActive = props.activeTab === 0;
        const style0 = {...style.tab, ...(firstActive ? style.tabActive : {})};
        const style1 = {...style.tab, ...(!firstActive ? style.tabActive : {})};

        return (
            <View style={style.container}>
                <TouchableOpacity disabled={firstActive} style={style0} onPress={props.onRegistrationTabs}>
                    <Text style={style.text}>{f`Create Wallet`}</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!firstActive} style={style1} onPress={props.onImportTabs}>
                    <Text style={style.text}>{f`Import`}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

interface IRegisterTabsProps {
    activeTab: number;
    onRegistrationTabs?: () => void;
    onImportTabs?: () => void;
}

interface IRegisterTabsState {

}
