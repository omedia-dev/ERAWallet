import React, {Component} from "react";
import {Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {dHeight, styles} from "../styles";
import * as _ from "lodash";

export class BottomMenu extends Component<IBottomMenuProps, IBottomMenuState> {
    private close = () => {
        this.setState({visible: false});
        this.props.onClose && this.props.onClose();
    };
    private toggle = () => {
        this.setState({visible: !this.state.visible});
    };

    constructor(props: IBottomMenuProps) {
        super(props);
        this.state = {visible: false};
    }

    componentWillReceiveProps(props: IBottomMenuProps) {
        this.setState({visible: props.visible === undefined ? this.state.visible : props.visible});
    }

    render(): JSX.Element {
        const actions = this.props.actions;
        const content = this.renderContent();
        const maxHeight = dHeight * 0.70;
        const height = Math.min(actions.length * 48, maxHeight);

        return (
            <View>
                <Modal animationType={"none"} visible={this.state.visible} transparent={true} onRequestClose={this.close}>
                    <TouchableOpacity style={styles.register.wholeContainer} activeOpacity={1} onPress={this.close}>
                        <ScrollView style={{maxHeight: height}} contentContainerStyle={styles.register.menuContainer}>
                            {actions.map((action, n) => {
                                if (action.visible && !action.visible()) return null;

                                return (
                                    <View key={n} style={{alignSelf: "stretch"}}>
                                        <TouchableOpacity onPress={this.action(action.action)} style={styles.register.menuItemContainer}>
                                            <Text style={styles.register.menuText} numberOfLines={1}>{action.name}</Text>
                                        </TouchableOpacity>
                                        {this.props.actions.length === n + 1 ? null :
                                            <View style={styles.shared.line}/>}
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </TouchableOpacity>
                </Modal>

                {content}
            </View>
        );
    }

    private renderContent() {
        if (!this.props.children) {
            return null;
        }

        return (
            <TouchableOpacity onPress={this.toggle}>{this.props.children}</TouchableOpacity>
        );
    }

    private action(action: () => void) {
        return () => {
            this.close();
            _.delay(action, 0);
        };
    }
}

interface IBottomMenuProps {
    visible?: boolean
    onClose?: () => void;
    actions: IBottomMenuActions[];
}

interface IBottomMenuState {
    visible: boolean;
}

export interface IBottomMenuActions {
    name: string;
    action: () => void;
    visible?: () => boolean;
}
