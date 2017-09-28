import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {UserImage} from "./UserImage";
import {styles} from "../styles";
import ImagePicker, {Image as IImage} from "react-native-image-crop-picker";
import {Log} from "./Log";
import {f} from "./t";
import {BottomMenu, IBottomMenuActions} from "./BottomMenu";

export class UserImageSelect extends Component<IUserImageSelectProps, IUserImageSelectState> {
    private showSelect = () => {
        this.setState({showSelect: true});
    };
    private closeSelect = () => {
        this.setState({showSelect: false});
    };
    private menuSelfClose = () => {
        this.setState({showSelect: false});
    };
    private clear = () => {
        this.closeSelect();
        this.setState({image: null});
        this.props.onImageSelect(null);
    };
    private selectImage = async (type: PickerType) => {
        const method = type === "camera" ? ImagePicker.openCamera : ImagePicker.openPicker;

        try {
            await ImagePicker.clean();
            Log.log("clean tmp");
        } catch (e) {
            Log.error(e);
        }

        try {
            const image = await method.call(ImagePicker, {
                width: 300,
                height: 300,
                cropping: true,
                mediaType: "photo"
            }) as IImage;

            this.setState({image});
            this.props.onImageSelect(image);
        } catch (e) {
            Log.log(e);
        }
    };
    private selectCamera = async () => {
        this.closeSelect();
        await this.selectImage("camera");
    };
    private selectGallery = async () => {
        this.closeSelect();
        await this.selectImage("gallery");
    };
    private menuActions: IBottomMenuActions[] = [
        {
            name: f`Make new photo`,
            action: () => this.selectCamera(),
        },
        {
            name: f`Select from gallery`,
            action: () => this.selectGallery(),
        },

    ];

    constructor(props: IUserImageSelectProps) {
        super(props);

        this.state = {image: null, showSelect: false};
    }

    render(): JSX.Element {
        const uri = this.state.image && this.state.image.path || this.props.path;
        const source = uri ? {uri} : null;
        const actions = this.menuActions.slice();
        if (source) {
            actions.push({
                name: f`Remove photo`,
                action: () => this.clear(),
            });
        }

        return (
            <View style={styles.userImageSelect.container}>
                <BottomMenu visible={this.state.showSelect} actions={actions} onClose={this.menuSelfClose}/>
                <TouchableOpacity onPress={this.showSelect}>
                    <UserImage source={source}/>
                    <Text style={styles.userImageSelect.text}>+ {f`Add photo`}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

interface IUserImageSelectProps {
    onImageSelect: (image: IImage | null) => void;
    path?: string;
}

interface IUserImageSelectState {
    image: IImage | null;
    showSelect: boolean;
}

type PickerType = "camera" | "gallery";
