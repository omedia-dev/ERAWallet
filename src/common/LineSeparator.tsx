import React, {Component} from "react";
import {View} from "react-native";
import {styles} from "../styles";

export class LineSeparator extends Component<IProps, IState> {
    render(): JSX.Element {
        return (<View style={styles.shared.line}/>);
    }
}
interface IProps {}
interface IState {}
