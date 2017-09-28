import React, {Component} from "react";
import {Text, View} from "react-native";
import {styles} from "../styles";

export class LocationItem extends Component<ILocationItemProps, ILocationItemState> {

    render(): JSX.Element {
        return (
            <View style={styles.geo.item.container}>
                <View style={styles.geo.item.textContainer}>
                    <Text style={styles.geo.item.title}>{this.props.title}</Text>
                    <Text style={styles.geo.item.subtitle}>{this.props.subtitle}</Text>
                </View>
            </View>
        );
    }

}

interface ILocationItemProps {
    title: string;
    subtitle: string;
}

interface ILocationItemState {
}
