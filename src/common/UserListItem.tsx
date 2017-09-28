import React, {Component} from "react";
import {ActivityIndicator, Image, Text, View} from "react-native";
import {styles} from "../styles";
import {EraPerson} from "../core/stores/era/EraPerson";

export class UserListItem extends Component<IUserListItemrops, IUserListItemState> {
    constructor(props: IUserListItemrops, context: any) {
        super(props, context);
        this.state = {imageLoaded: false, imageUri: ""};
    }

    async componentDidMount() {
        const imageUri = await this.props.person.getImageUri();
        if (imageUri) {
            this.setState({imageUri, imageLoaded: true});
        }
    }

    render(): JSX.Element {
        const image = !this.state.imageLoaded ?
            <ActivityIndicator style={styles.userListItem.spinner} animating={true} color={"#fff"} size={"small"}/> :
            <Image source={{uri: this.state.imageUri}} style={styles.userListItem.image}/>;

        return (
            <View style={styles.userListItem.container}>
                {image}
                <View style={styles.userListItem.textContainer}>
                    <Text numberOfLines={1} style={styles.userListItem.name}>{this.props.person.name}</Text>
                    <Text numberOfLines={1} style={styles.userListItem.id}>{this.props.person.creator}</Text>
                </View>
            </View>
        );
    }
}

interface IUserListItemrops {
    person: EraPerson;
}

interface IUserListItemState {
    imageLoaded: boolean;
    imageUri: string;
}
