import React, {Component} from "react";
import {Modal, Text, View, ViewStyle} from "react-native";
import {AlignItems, JustifyContent, Positions} from "../../types/RNStyles";
import {dHeight, dWidth, primaryColor} from "../../styles";
import {SelectItem} from "./SelectItem";
import {f} from "../t";

export class Select extends Component<ISelectProps, ISelectState> {
    static Item = SelectItem;

    constructor(props: ISelectProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <Modal animationType={"fade"} transparent={true} onRequestClose={this.props.onClose}>
                <View style={styles.Select}>
                    <View style={styles.picker}>
                        {this.props.children}
                        {this.props.cancelable === true ? this.renderCancel() : null}
                    </View>
                </View>
            </Modal>
        );
    }

    renderCancel(): JSX.Element {
        return (
            <Select.Item onSelect={this.props.onClose}><Text>{this.props.cancelText || f`Close`}</Text></Select.Item>);
    }
}

const styles = {
    Select: {
        backgroundColor: "rgba(255,255,255,0.5)",
        position: Positions.absolute,
        top: 0,
        left: 0,
        width: dWidth,
        height: dHeight,
        alignItems: AlignItems.center,
        justifyContent: JustifyContent.center,
        zIndex: 10,
    } as ViewStyle,
    picker: {
        backgroundColor: "#fff",
        borderRadius: 4,
        borderColor: primaryColor,
        borderWidth: 1,
        borderBottomWidth: 0,
    } as ViewStyle
};

interface ISelectProps {
    onClose: () => void;
    cancelText?: string;
    cancelable?: boolean;
}

interface ISelectState {

}
