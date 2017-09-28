import React, {Component} from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {styles} from "../styles";
import {ImageResources} from "./ImageRecources.g";
import {AlignItems} from "../types/RNStyles";
import {f} from "./t";
import {EraPerson, IPersonLocation} from "../core/stores/era/EraPerson";

export class UserDataPanel extends Component<IUserDataPanelProps, IUserDataPanelState> {
    private toggle = () => {
        this.setState({visible: !this.state.visible});
    };

    constructor(props: IUserDataPanelProps, context: any) {
        super(props, context);

        this.state = {visible: false};
    }

    async componentWillMount(): Promise<void> {
        const location = await this.props.profile.getLocation();
        if (location) {
            this.setState({location});
        }
    }

    render(): JSX.Element {
        const person = this.props.profile;
        const eyeColor = person.eyeColor && person.eyeColor.length > 1 ? f`eye color`+": " + `${person.eyeColor}. ` : "";
        const hairColor = person.hairColor && person.hairColor.length > 1 ? f`hair color`+": " + `${person.hairColor}. `: "";
        const height = person.height ?  f`Height` + ":" +`${person.height}. ` : "";
        const userDesc = eyeColor + hairColor + height + person.sexFormatted;

        let location = "";
        if (this.state.location) {
            const {city, country} = this.state.location;
            location = [city, country].join(", ");
        }

        const imageStyle = {
            transform: [{rotate: this.state.visible ? "90deg" : "0deg"}]
        };

        return (
            <View>
                <TouchableOpacity style={styles.userDataPanel.container} onPress={this.toggle}>
                    <Text style={styles.userDataPanel.title}>{f`User data`}</Text>
                    <Image style={imageStyle} source={ImageResources.icon_list_blue}/>
                </TouchableOpacity>
                {this.state.visible ? (<View style={{paddingHorizontal: 24, paddingBottom: 24, paddingTop: -8}}>
                    <View style={styles.userDataPanel.dataRow}>
                        <Image style={styles.userDataPanel.image} source={ImageResources.icon_calendar}/>
                        <Text numberOfLines={1}
                              style={styles.userDataPanel.text}>{this.props.profile.birthdayFormatted}</Text>
                    </View>
                    <View style={styles.userDataPanel.dataRow}>
                        <Image style={styles.userDataPanel.image} source={ImageResources.icon_map}/>
                        <Text numberOfLines={1}
                              style={styles.userDataPanel.text}>{location}</Text>
                    </View>
                    <View style={styles.userDataPanel.dataRow}>
                        <Image style={styles.userDataPanel.image} source={ImageResources.icon_document}/>
                        <Text style={styles.userDataPanel.text}>{person.description}</Text>
                    </View>
                    <View style={{...styles.userDataPanel.dataRow, alignItems: AlignItems.flexStart}}>
                        <Image style={styles.userDataPanel.image} source={ImageResources.icon_user}/>
                        <Text style={styles.userDataPanel.text}>{userDesc}</Text>
                    </View>
                </View>) : null}
            </View>
        );
    }
}

interface IUserDataPanelProps {
    profile: EraPerson;
}

interface IUserDataPanelState {
    visible: boolean;
    location?: IPersonLocation;
}
