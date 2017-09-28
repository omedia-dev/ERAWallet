import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../styles";
import {ImageResources} from "./ImageRecources.g";
import {stores} from "../core/stores/Stores";
import {BackHandled} from "./BackHandled";
import {f} from "./t";

export class TransactionHistoryItem extends BackHandled<IHistoryItemProps, IHistoryItemState> {
    private onPress = () => {
        if (this.props && this.props.index >= 0) {
            stores.walletStore.selectIndex(this.props.index);
            stores.navigationStore.navigate("TransactionDetail");
        }
    };

    render(): JSX.Element {
        return (
            <TouchableOpacity onPress={this.onPress} activeOpacity={0.9} style={styles.historyItem.container}>
                <View style={styles.historyItem.dateSumContainer}>
                    <Text style={styles.historyItem.date}>{this.props.dateTime}</Text>
                    <Text style={styles.historyItem.sum}>{this.props.sum}</Text>
                </View>
                <Text style={styles.historyItem.confirmation}>{this.props.confirmation}</Text>
                <Text style={styles.historyItem.header}>{this.props.header}</Text>
                <View style={styles.historyItem.bottomContainer}>
                    <View style={styles.historyItem.bottomLeftContainer}>
                        <Text style={styles.historyItem.accountLabel}>{f`account number`}</Text>
                        <Text style={styles.historyItem.account}>{this.props.account}</Text>
                    </View>
                    <Image style={styles.historyItem.image}
                           source={this.props.positive ? ImageResources.icon_receive : ImageResources.icon_send}/>
                </View>
            </TouchableOpacity>
        );
    }
}

interface IHistoryItemProps {
    sum: string;
    dateTime: string;
    header: string;
    positive: boolean;
    confirmation: string
    account: string;
    index: number;
}

interface IHistoryItemState {
}
