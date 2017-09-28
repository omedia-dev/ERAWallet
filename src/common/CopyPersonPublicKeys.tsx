import React, {Component} from "react";
import {Image, Text, View} from "react-native";
import {styles} from "../styles";
import {ImageResources} from "./ImageRecources.g";
import {BottomMenu, IBottomMenuActions} from "./BottomMenu";
import {f} from "./t";

export class CopyPersonPublicKeys extends Component<ICopyPersonPublicKeysProps, ICopyPersonPublicKeysState> {
    menuActions: IBottomMenuActions[] = [
        {
            name: f`Copy account`,
            action() {
                this.copyAddress();
            }
        },
        {
            name: f`Copy open key`,
            action() {
                this.copyPublicKey();
            }
        },
    ];

    constructor(props: ICopyPersonPublicKeysProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <View style={styles.infoItem.container}>
                <Text style={styles.infoItem.title}>{f`Yours address`}</Text>
                <View style={styles.infoItem.valueContainer}>
                    <Text numberOfLines={1} style={styles.infoItem.value}>{this.props.data.address}</Text>
                    <BottomMenu actions={this.menuActions}>
                        <View style={styles.infoItem.button}>
                            <Image style={styles.infoItem.button} source={ImageResources.icon_copy}/>
                        </View>
                    </BottomMenu>
                </View>
            </View>
        );
    }
}

interface ICopyPersonPublicKeysProps {
    data: { publicKey?: string, address?: string };
}

interface ICopyPersonPublicKeysState {

}
