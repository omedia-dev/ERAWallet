import React from "react";
import {stores} from "../../core/stores/Stores";
import {BackHandled} from "../../common/BackHandled";
import {bind} from "../../types/autobind";
import {ActionResultWidget} from "../../common/ActionResultWidget";
import {f} from "../../common/t";

export class IdentificationState extends BackHandled<IIdentificationStateProps, IIdentificationStateState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };

    constructor(props: IIdentificationStateProps) {
        super(props);
    }

    render(): JSX.Element {
        const {result, response} = stores.navigationStore.params;
        const message = result ? f`message_2.1` : f`message_1.1`;

        return (
            <ActionResultWidget onContinue={this.back} success={result} message={message} debugData={response}/>
        );
    }

    @bind
    protected back(): any {
        stores.navigationStore.navigate("Identification");
        return true;
    }
}

interface IIdentificationStateProps {

}

interface IIdentificationStateState {

}

export interface IIdentificationStateParams {
    result: boolean;
    response: string;
}
