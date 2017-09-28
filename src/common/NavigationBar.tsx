import React, {Component} from "react";
import {Animated, ImageURISource, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../styles";
import Image = Animated.Image;

interface IProps {
    leftButton?: ImageURISource;
    rightButton?: ImageURISource;
    rightWidget?: JSX.Element;
    title: string;
}

interface IDispatchProps {
    onLeftButtonPress?: () => void;
    onRightButtonPress?: () => void;
}

interface IState {
}

export class NavigationBar extends Component<IProps & IDispatchProps, IState> {
    render(): JSX.Element {
        return (
            <View style={styles.navigationBar.container}>
                <View style={styles.navigationBar.navigationHeader}>
                    {this.leftButton()}
                    <Text style={styles.navigationBar.title} numberOfLines={1}>{this.props.title}</Text>
                    {this.rightButton()}

                    {this.props.rightWidget ? this.props.rightWidget : null}
                </View>
            </View>);
    }

    leftButton(): JSX.Element {
        if (this.props.leftButton) {
            return (
                <TouchableOpacity onPress={this.props.onLeftButtonPress}>
                    <View>
                        <Image
                            source={this.props.leftButton}
                            style={styles.navigationBar.iconButton}
                            resizeMode="center"
                        />
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <View style={{width: 44}}/>
        );
    }

    rightButton(): JSX.Element | null {
        if (this.props.rightButton) {
            return (
                <TouchableOpacity onPress={this.props.onRightButtonPress}>
                    <Image
                        source={this.props.rightButton}
                        style={styles.navigationBar.iconButton}
                        resizeMode="center"
                    />
                </TouchableOpacity>
            );
        } else {
            return ( this.props.rightWidget ? null : <View style={{width: 44}}/> );
        }
    }
}
