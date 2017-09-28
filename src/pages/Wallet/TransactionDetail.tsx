import React from "react";
import {Image, ScrollView, Text, View} from "react-native";
import {styles} from "../../styles";
import {NavigationBar} from "../../common/NavigationBar";
import {ImageResources} from "../../common/ImageRecources.g";
import {stores} from "../../core/stores/Stores";
import {observer} from "mobx-react";
import {f} from "../../common/t";
import {BackHandled} from "../../common/BackHandled";

@observer
export class TransactionDetail extends BackHandled<ITransactionDetailProps, ITransactionDetailState> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };

    render(): JSX.Element {
        const data = stores.walletStore.history[stores.walletStore.selectedHistoryIndex];

        return (
            <View style={styles.container}>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`Transaction`}
                    leftButton={ImageResources.icon_back}
                    onLeftButtonPress={this.back}
                />
                <View style={styles.transactionDetail.container}>
                    <ScrollView>
                        <View style={styles.transactionDetail.subContainer}>
                            <Text numberOfLines={1} style={styles.transactionDetail.title}>Block:</Text>
                            <Text numberOfLines={1} style={styles.transactionDetail.value}>{"<" + data.sourceData.height + "-" + data.sourceData.sequence + ">"}</Text>
                        </View>

                        <View style={styles.transactionDetail.subContainer}>
                            <Text numberOfLines={1} style={styles.transactionDetail.title}>Signature:</Text>
                            <Text numberOfLines={1}
                                  style={styles.transactionDetail.value}>{data.sourceData.signature}</Text>
                        </View>

                        <View style={styles.transactionDetail.subContainer}>
                            <Text numberOfLines={1} style={styles.transactionDetail.title}>Type:</Text>
                            <Text numberOfLines={1} style={styles.transactionDetail.value}>{data.sourceData.type_name}</Text>
                        </View>

                        <View style={styles.transactionDetail.subContainer}>
                            <Text numberOfLines={1} style={styles.transactionDetail.title}>Amount:</Text>
                            <Text style={styles.transactionDetail.value}>{data.sourceData.amount + " " + data.asset}</Text>
                        </View>

                        <View style={styles.transactionDetail.subContainer}>
                            <Text numberOfLines={1} style={styles.transactionDetail.title}>Date:</Text>
                            <Text numberOfLines={1} style={styles.transactionDetail.value}>{data.dateTime}</Text>
                        </View>

                        <View style={styles.transactionDetail.subContainer}>
                            <Text numberOfLines={1} style={styles.transactionDetail.title}>Creator:</Text>
                            <Text numberOfLines={1} style={styles.transactionDetail.value}>{data.sourceData.creator}</Text>
                        </View>

                        <View style={styles.transactionDetail.subContainer}>
                            <Text numberOfLines={1} style={styles.transactionDetail.title}>Size:</Text>
                            <Text numberOfLines={1} style={styles.transactionDetail.value}>{data.sourceData.size}</Text>
                        </View>

                        <View style={styles.transactionDetail.subContainer}>
                            <Text numberOfLines={1} style={styles.transactionDetail.title}>Fee:</Text>
                            <Text numberOfLines={1} style={styles.transactionDetail.value}>{data.sourceData.fee}</Text>
                        </View>

                        <View style={styles.transactionDetail.subContainer}>
                            <Text numberOfLines={1} style={styles.transactionDetail.title}>Confirmations:</Text>
                            <Text numberOfLines={1}
                                  style={styles.transactionDetail.value}>{data.sourceData.confirmations}</Text>
                        </View>

                    </ScrollView>
                </View>
            </View>
        );
    }

}

interface ITransactionDetailProps extends INavigationProps {
}

interface ITransactionDetailState {
}
