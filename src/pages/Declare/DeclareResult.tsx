import React from "react";
import {BackHandled} from "../../common/BackHandled";
import {bind} from "../../types/autobind";
import {stores} from "../../core/stores/Stores";
import {ActionResultWidget} from "../../common/ActionResultWidget";

export class DeclareResult extends BackHandled<{}, {}> {
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
        const {message, state, response} = stores.navigationStore.params;

        return (
            <ActionResultWidget onContinue={this.back} success={state} message={message} debugData={response}/>
        );
    }
}

