import React, {Component} from "react";
import {Btn} from "./Btn/Btn";
import {DatePickerAndroid, DatePickerIOS, Modal, Platform, View} from "react-native";
import {FontNames} from "./FontNames";
import {dWidth, sliderTransparentBackground, textBorderColor} from "../styles";
import {AlignItems} from "../types/RNStyles";

export class DatePicker extends Component<IDatePickerProps, IDatePickerState> {
    private maxDate: Date;
    private setTempIosDate = (date: Date) => {
        this.setState({tempIosDate: new Date(date)});
    };
    private setDate = (date: Date) => {
        this.setState({date});
        this.props.onDateChange(date);
    };
    private iosGetDate = () => {
        this.setState({iosDate: true});
    };
    private androidGetDate = async () => {
        try {
            const result = await DatePickerAndroid.open({date: this.state.date || this.maxDate, maxDate: this.maxDate});
            if (result.year !== undefined && result.month !== undefined && result.day !== undefined) {
                this.setDate(new Date(result.year, result.month, result.day));
            }
        } catch (e) {
            throw new Error(e);
        }
    };
    private iosOk = () => {
        if (this.state.tempIosDate)
            this.setDate(this.state.tempIosDate);
        this.setState({iosDate: false});
    };
    private iosCancel = () => {
        this.setState({iosDate: false});
    };

    constructor(props: IDatePickerProps) {
        super(props);

        const date = this.props.date || null;
        this.state = {date, tempIosDate: date, iosDate: false};

        this.maxDate = new Date();
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    }

    render(): JSX.Element {
        return Platform.OS === "ios" ? this.renderIOS() : this.renderAndroid();
    }

    private renderIOS() {
        return (
            <View>
                <Modal visible={this.state.iosDate} transparent={true}>
                    <View style={{
                        backgroundColor: sliderTransparentBackground,
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <View style={{
                            alignItems: AlignItems.stretch,
                            flexDirection: "column",
                            backgroundColor: "#fff",
                            width: dWidth * 0.9,
                            padding: 16
                        }}>
                            <DatePickerIOS
                                mode={"date"}
                                onDateChange={this.setTempIosDate}
                                date={this.state.tempIosDate || this.maxDate}
                                maximumDate={this.maxDate}
                            />

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingTop: 16,
                            }}>
                                <Btn onPress={this.iosOk} title="Ok" fill={true} customBtnStyles={{minWidth: 100}}/>
                                <Btn onPress={this.iosCancel} title="Cancel" fill={true}
                                     customBtnStyles={{minWidth: 100}}/>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Btn
                    customBtnStyles={{justifyContent: "flex-start"}}
                    onPress={this.iosGetDate}
                    title={this.state.date ? this.state.date.toLocaleDateString() : this.props.placeholder}
                    customTextStyles={{...{fontFamily: FontNames.ProstoLight, color: textBorderColor}}}
                />
            </View>
        );
    }

    private renderAndroid() {
        return (
            <Btn
                customBtnStyles={{justifyContent: "flex-start"}}
                onPress={this.androidGetDate}
                title={this.state.date ? this.state.date.toLocaleDateString() : this.props.placeholder}
                customTextStyles={{...{fontFamily: FontNames.ProstoLight, color: textBorderColor}}}
            />
        );
    }
}

interface IDatePickerProps {
    onDateChange: (date: Date) => void;
    placeholder: string;
    date?: Date | null;
}

interface IDatePickerState {
    date: Date | null;
    iosDate: boolean;
    tempIosDate: Date | null;
}
