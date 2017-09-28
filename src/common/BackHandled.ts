import {BackHandler} from "react-native";
import {bind} from "../types/autobind";
import {stores} from "../core/stores/Stores";
import {Component} from "react";

export class BackHandled<P, S> extends Component<P, S> {
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.back);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.back);
    }

    @bind
    protected back(): true {
        if(stores.navigationStore.activeRoute !== "MyWallet") {
            stores.navigationStore.goBack();
        } else {
            BackHandler.exitApp();
        }
        return true;
    }
}
