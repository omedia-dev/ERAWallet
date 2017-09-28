/**
 * Created by kirill on 28.06.2017.
 */
import React, {Component} from "react";
import {Animated, Image, ImageURISource, TouchableOpacity, View} from "react-native";
import {menuItemBackgroudSelected, styles} from "../styles";
import {observer} from "mobx-react";
import {stores} from "../core/stores/Stores";
import Text = Animated.Text;

@observer
export class DrawerMenuItem extends Component<IMenuItemProps, IMenuItemState> {
    render(): JSX.Element {

        const selfHierarch = this.props.id.split(".");
        const hierarchy = stores.navigationStore.menuId.split(".");

        if (selfHierarch.length === 1) {
            const selected = stores.navigationStore.activeRoute === this.props.route;

            return (
                <View style={{...styles.menu.item.container, ...(selected ? {backgroundColor: menuItemBackgroudSelected} : {backgroundColor: "transparent"})}}>
                    <TouchableOpacity style={styles.menu.item.button} onPress={this.props.onPress}>
                        <View
                            style={{...styles.menu.item.leftLine, ...(selected ? {} : {backgroundColor: "transparent"})}}/>
                        <Image style={styles.menu.item.icon} source={this.props.icon}/>
                        <Text style={styles.menu.item.title} numberOfLines={1}>{this.props.title}</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            const selected = stores.navigationStore.menuId === this.props.id;
            if (selfHierarch[0] === hierarchy[0]) {
                return <View
                    style={{...styles.menu.item.container, ...(selected ? {backgroundColor: menuItemBackgroudSelected} : {backgroundColor: "transparent"})}}>
                    <TouchableOpacity style={styles.menu.item.button} onPress={this.props.onPress}>
                        <View
                            style={{...styles.menu.item.leftLine, ...(selected ? {} : {backgroundColor: "transparent"})}}/>
                        <Image style={{marginLeft: 48}} source={this.props.icon}/>
                        <Text style={styles.menu.item.title}>{this.props.title}</Text>
                    </TouchableOpacity>
                </View>;
            } else {
                return <View/>;
            }

        }
    }
}

interface IMenuItemProps {
    onPress: () => void;
    id: string;
    route: string;
    icon: ImageURISource;
    title: string;
    subItem?: boolean;
    related?: string;
}

interface IMenuItemState {
}
