import React, {Component} from "react";
import {Image, View} from "react-native";
import {ImageResources} from "./ImageRecources.g";
import {request} from "../App";

export class ServerStatusWidget extends Component<IServerStatusWidgetProps, IServerStatusWidgetState> {
    private t: number;

    private unmounted: boolean = false;

    constructor(props: IServerStatusWidgetProps) {
        super(props);

        this.state = {status: false, loading: false};
    }

    componentDidMount(): void {
        this.ping();
    }

    componentWillUnmount(): void {
        this.unmounted = true;
        clearInterval(this.t);
    }

    render(): JSX.Element {
        const source = this.state.status ? ImageResources.icon_cloud_server : ImageResources.icon_cloud_server_no;

        return (
            <View style={{paddingRight: 8}}>
                <Image source={source} style={{width: 26, height: 22}}/>
            </View>
        );
    }

    private async ping() {
        try {
            await request.block.lastBlock();
            if (!this.unmounted) {
                this.setState({status: true});
            }
        } catch (e) {
            if (!this.unmounted) {
                this.setState({status: false});
            }
        } finally {
            if (!this.unmounted) {
                this.t = setTimeout(() => this.ping(), 5000);
            }
        }
    }
}

interface IServerStatusWidgetProps {

}

interface IServerStatusWidgetState {
    status: boolean;
    loading: boolean;
}
