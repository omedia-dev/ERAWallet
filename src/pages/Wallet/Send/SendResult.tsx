import React from "react";
import {bind} from "../../../types/autobind";
import {stores} from "../../../core/stores/Stores";
import {ActionResultWidget} from "../../../common/ActionResultWidget";
import {BackHandled} from "../../../common/BackHandled";

export class SendResult extends BackHandled<{}, {}> {
    //noinspection JSUnusedGlobalSymbols
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };

    @bind
    back(): true {
        stores.navigationStore.reset("Main");
        return true;
    }

    render(): JSX.Element {
        const {state, message, response} = stores.navigationStore.params as ISendResultParams;

        return (
            <ActionResultWidget onContinue={this.back} success={state} message={message} debugData={response}/>
        );
    }
}

export interface ISendResultParams {
    state: boolean;
    message: string;
    response: string;
}
