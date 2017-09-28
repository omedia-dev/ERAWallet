import React, {Component} from "react";
import {TouchableOpacity, ViewStyle} from "react-native";
import {primaryColor} from "../../styles";

export class SelectItem extends Component<ISelectItemProps, ISelectItemState> {
    constructor(props: ISelectItemProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <TouchableOpacity style={styles.btn} onPress={this.props.onSelect}>{this.props.children}</TouchableOpacity>
        );
    }
}

const styles = {
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        minWidth: 200,
        borderBottomColor: primaryColor,
        borderBottomWidth: 1,
    } as ViewStyle
};

interface ISelectItemProps {
    onSelect: () => void;
}

interface ISelectItemState {

}
