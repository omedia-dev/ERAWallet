/**
 * Created by kirill on 28.06.2017.
 */
import React, {Component} from "react";
import {ActivityIndicator, Image, ImageStyle, Modal, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {dHeight, dWidth, styles} from "../styles";
import {ImageResources} from "./ImageRecources.g";
import {stores} from "../core/stores/Stores";
import {EraPerson, IPersonLocation} from "../core/stores/era/EraPerson";

export class ContactInfo extends Component<IContactProps, IContactState> {

    private openImage = async () => {
        if (this.state.imageUri) {
            if (!this.state.width || !this.state.width) {
                this.setState({...await this.getImageSize(), showImage: true});
            } else {
                this.setState({showImage: true});
            }
        }
    };
    private closeImage = () => {
        this.setState({showImage: false});
    };

    constructor(props: IContactProps, context: any) {
        super(props, context);

        this.state = {
            showImage: false,
            width: 0,
            height: 0,
            imageUri: "",
            imageLoaded: false,
            location: {} as IPersonLocation
        };
    }

    componentWillMount(): void {
        this.loadLocation();
        this.loadAvatar();
    }

    render(): JSX.Element {
        const profile = this.props.profile;

        return (
            <View style={styles.contactInfo.container} onLayout={e => stores.topNavImgStore.height = e.nativeEvent.layout.height}>
                {this.renderImage()}
                {this.renderAvatar()}

                <View style={styles.contactInfo.infoPanel}>
                    <Text numberOfLines={2} style={styles.contactInfo.nameText}>{profile.name}</Text>
                    {profile.key ? <Text style={styles.contactInfo.key}>{profile.key}</Text> : null}
                    <View style={styles.contactInfo.line}/>
                    <View style={styles.contactInfo.infoBottomContainer}>
                        <Text numberOfLines={1} style={styles.contactInfo.bottomText}>{profile.ageFormatted}</Text>
                        <Image style={styles.contactInfo.iconPin} source={ImageResources.icon_pin}/>
                        <Text numberOfLines={1} style={styles.contactInfo.bottomText}>{this.state.location.city}</Text>
                    </View>
                </View>
            </View>
        );
    }

    private renderAvatar(): JSX.Element {
        return this.state.imageLoaded ?
            <TouchableOpacity onPress={this.openImage}>
                <Image style={styles.contactInfo.avatar} source={{uri: this.state.imageUri}}/>
            </TouchableOpacity> :
            <ActivityIndicator style={styles.contactInfo.spinner} animating={true} color={"#fff"} size={"small"}/>;
    }

    private async getImageSize(): Promise<{ width: number; height: number }> {
        return new Promise<{ width: number, height: number }>((resolve, reject) => {
            const uri = this.state.imageUri;
            const success = (width: number, height: number) => resolve({
                width: Math.min(dWidth, width),
                height: Math.min(dHeight, height)
            });
            const failure = () => reject({width: 0, height: 0});

            Image.getSize(uri, success, failure);
        });
    }

    private renderImage() {
        if (!this.state.showImage || !this.state.width || !this.state.height) return null;

        return (
            <Modal animationType={"none"} onRequestClose={this.closeImage}>
                <View style={style.backDrop}>
                    <TouchableOpacity onPress={this.closeImage} style={style.backButton}>
                        <Image source={ImageResources.icon_back}/>
                    </TouchableOpacity>

                    <Image source={{uri: this.state.imageUri}} resizeMode={"contain"} style={{
                        ...style.image,
                        width: this.state.width,
                        height: this.state.height,
                    }}/>
                </View>
            </Modal>
        );
    }

    private async loadLocation(): Promise<void> {
        const location = await this.props.profile.getLocation();
        if (location) {
            this.setState({location});
        }
    }

    private async loadAvatar(): Promise<void> {
        const imageUri = await this.props.profile.getImageUri();
        if (imageUri) {
            this.setState({imageUri, imageLoaded: true});
        }
    }
}

const style = {
    backDrop: {
        backgroundColor: "#000",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    } as ViewStyle,
    image: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    } as ImageStyle,
    backButton: {
        position: "absolute",
        top: 22,
        left: 0,
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1
    } as ViewStyle,
};

interface IContactProps extends INavigationProps {
    profile: EraPerson;
}

interface IContactState {
    imageLoaded: boolean;
    imageUri: string;
    location: IPersonLocation;

    showImage: boolean;
    width: number;
    height: number;
}
