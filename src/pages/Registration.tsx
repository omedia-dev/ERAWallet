import React from "react";
import {Dimensions, Image, Platform, Share, Text, TextInput, TouchableOpacity, View} from "react-native";
import {secondaryColor, shadowColor, styles, textBorderColor} from "../styles";
import {UserImageSelect} from "../common/UserImageSelect";
import {Btn} from "../common/Btn/Btn";
import {ImageResources} from "../common/ImageRecources.g";
import Slider from "react-native-slider";
import {LayoutEvent} from "react-navigation";
import {BtnStyles} from "../common/Btn/styles";
import {DatePicker} from "../common/DatePicker";
import {IRegistrationData} from "../core/src/core/item/persons/IFullPersonHuman";
import {stores} from "../core/stores/Stores";
import {Toaster} from "../common/Toaster";
import {observer} from "mobx-react";
import {autorun} from "mobx";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {f} from "../common/t";
import {Loading} from "../common/Loading";
import {NavigationBar} from "../common/NavigationBar";
import {BackHandled} from "../common/BackHandled";
import {FontNames} from "../common/FontNames";
import {BottomMenu, IBottomMenuActions} from "../common/BottomMenu";
import Toast from "react-native-simple-toast";

const dWidth = Dimensions.get("window").width;

@observer
export class Registration extends BackHandled<IRegisterProps, IRegisterState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    private heightValueWidth: number = 10;
    private heightLabelWidth: number = 40;
    private minHeight: number = 100;
    private maxHeight: number = 250;
    private menu = () => {
        stores.navigationStore.drawerOpen();
    };
    private onExclamation = () => {
        Toast.show(f`Preson is not Confirmed`);
    };
    private navigateToSearchLocation = () => {
        const predefined = stores.registrationStore.data.geoData ? [stores.registrationStore.data.geoData] : undefined;
        const placeholder = f`birthplace`;
        stores.navigationStore.navigate("LocationSelector", {predefined, placeholder});
    };
    private done = () => {
        const result = stores.registrationStore.validate();
        if (!result.length) {
            this.share();
        } else {
            Toaster.error(result[0]);
        }
    };
    private share = async () => {
        this.setState({loading: true});
        const message = await stores.registrationStore.getShareData();
        this.setState({loading: false});
        const date = new Date(stores.registrationStore.data.date);
        const _date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        const title = f`I'm in Era: ${stores.registrationStore.data.name}, ${_date} g`;
        await Share.share({title, message}, {dialogTitle: title});
    };
    private setHeight = (height: number) => {
        stores.registrationStore.data.height = Math.round(height);
    };
    private toggle = () => {
        this.setState({expanded: !this.state.expanded});
        setTimeout(() => (this.refs.scrollView as any).scrollToEnd(true), 250);
    };
    private setHeightLabelWidth = (e: LayoutEvent) => {
        this.heightLabelWidth = e.nativeEvent.layout.width;
    };
    private setHeightValueWidth = (e: LayoutEvent) => {
        this.heightValueWidth = e.nativeEvent.layout.width;
    };
    private setLocation = (data: any, details: any) => {
        this.setData("geoData", data);
        this.setData("geoDetails", details);
    };

    constructor(props: IRegisterProps) {
        super(props);
        this.state = {expanded: false, loading: false};
    }

    get heightOffset(): number {
        const containerHorizontalPadding = 32;
        const thumbSize = 8;
        const sides = 2;
        const fullWidth = dWidth - containerHorizontalPadding * sides;
        const minValue = this.minHeight;
        const spaceOffset = 10;
        const left = (fullWidth * (stores.registrationStore.data.height - minValue) / (this.maxHeight - minValue)) - (thumbSize / sides) - spaceOffset;

        return Math.max(left, this.heightLabelWidth + spaceOffset);
    }

    async componentDidMount(): Promise<void> {
        super.componentDidMount();

        const data = stores.registrationStore.data;
        if (data.geoData && data.geoDetails) {
            stores.locationStore.selectedLocation = {
                data: data.geoData,
                details: data.geoDetails
            };
        }

        autorun(() => {
            const newLocation = stores.locationStore.newLocation;
            const selectedLocation = stores.locationStore.selectedLocation;

            if (newLocation) {
                if (!selectedLocation || (newLocation.data.id !== selectedLocation.data.id)) {
                    this.setLocation(newLocation.data, newLocation.details);
                }
            }
        });
    }

    render(): JSX.Element {
        const dopForm = !this.state.expanded ? (
            <TouchableOpacity onPress={this.toggle} style={styles.register.more.btn}>
                <Text style={styles.register.more.text}>{f`Additional form`}</Text>
                <Image source={ImageResources.icon_arr_down} style={styles.register.more.iconRight}/>
            </TouchableOpacity>
        ) : null;

        const genderActions: IBottomMenuActions[] = [f`Male`, f`Female`].map((g) => ({
            name: g,
            action: (): void => this.setData("gender", g)
        }));

        const data = stores.registrationStore.data;
        const locationPlaceholder = (data.geoDetails && data.geoDetails.formatted_address) || (data.geoData && data.geoData.description) || f`birthplace`;
        const more = this.state.expanded ? this.renderMoreForm() : null;
        return (
            <View style={styles.container}>
                <Loading state={this.state.loading}/>
                <Image source={ImageResources.background} style={styles.shared.topBackgroundImage}/>
                <NavigationBar
                    title={f`Register`}
                    leftButton={ImageResources.icon_menu}
                    onLeftButtonPress={this.menu}
                />
                <View style={{marginBottom: 60, flex: 1}}>
                    <KeyboardAwareScrollView ref="scrollView" viewIsInsideTabBar={true}
                                             showsVerticalScrollIndicator={false}>

                        <View style={styles.register.bottom}>
                            <View style={styles.register.userImageSelect}>
                                <UserImageSelect
                                    onImageSelect={this.setData<object | null>("imageInfo")}
                                    path={data.imageInfo && data.imageInfo.path}
                                />
                            </View>
                            {stores.accountStore.profile && stores.accountStore.profile.isAuthorized ? null :
                                <TouchableOpacity style={styles.register.exContainer} onPress={this.onExclamation}>
                                    <Image style={styles.register.exPoint} source={ImageResources.icon_exclamation_point}/>
                                </TouchableOpacity>}

                            <View style={styles.register.formRow}>
                                <TextInput
                                    placeholder={f`Full name`}
                                    placeholderTextColor={textBorderColor}
                                    style={{...styles.register.textInput, ...{paddingRight: Platform.OS === 'ios' ? 10 : 16}}}
                                    underlineColorAndroid={"transparent"}
                                    value={data.name}
                                    onChangeText={this.setData("name")}
                                    autoCapitalize={"words"}
                                />
                            </View>

                            <View style={{...styles.register.formRow, ...{flexDirection: "row"}}}>
                                <View style={{flex: 1, marginRight: 19}}>
                                    <DatePicker
                                        onDateChange={this.setData("date")}
                                        date={data.date ? new Date(data.date) : null}
                                        placeholder={f`birth date`}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <BottomMenu actions={genderActions}>
                                        <View style={BtnStyles.container}>
                                            <View style={styles.register.dropDown.container}>
                                                <Text
                                                    style={{
                                                        ...BtnStyles.text, ...{
                                                            fontFamily: FontNames.ProstoLight,
                                                            color: textBorderColor
                                                        }
                                                    }}>{stores.registrationStore.data.gender || f`sex`}</Text>
                                                {/*<Image style={styles.register.dropDown.icon}*/}
                                                {/*source={ImageResources.icon_arr_down}/>*/}
                                            </View>
                                        </View>
                                    </BottomMenu>
                                </View>
                            </View>

                            <View style={styles.register.formRow}>
                                <Btn
                                    customBtnStyles={{justifyContent: "flex-start", flexDirection: "row"}}
                                    onPress={this.navigateToSearchLocation}
                                >
                                    <Image source={ImageResources.icon_pin} style={styles.register.icon_pin}/>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode={"tail"}
                                        style={{
                                            ...BtnStyles.text,
                                            marginLeft: 5,
                                            fontFamily: FontNames.ProstoLight,
                                            color: textBorderColor
                                        }}
                                    >{locationPlaceholder}
                                    </Text>
                                </Btn>
                            </View>
                            <View style={styles.register.formRow}>
                                <TextInput
                                    placeholder={f`description`}
                                    multiline={true}
                                    placeholderTextColor={textBorderColor}
                                    style={{...styles.register.textInputDescription, ...{paddingVertical: 16}}}
                                    underlineColorAndroid={"transparent"}
                                    value={data.description}
                                    onChangeText={this.setData("description")}
                                />
                            </View>
                            {dopForm}

                            {more}
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <View style={styles.myWallet.bottomContainer}>
                    <TouchableOpacity style={styles.myWallet.buttonLeft} activeOpacity={0.9} onPress={this.done}>
                        <Text style={styles.myWallet.buttonText}>{f`Share data`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    private renderMoreForm(): JSX.Element {
        const eyeActions = [f`Blue`, f`lightBlue`, f`Gray`, f`Green`, f`Yantar`, f`Olive`, f`Brown`, f`Afro`, f`Yelow`].map((g) => ({
            name: g,
            action: (): void => this.setData("eyeColor", g)
        }));
        const hairActions = [f`Blond`, f`Brunette`, f`Brown-haired`, f`Red-haired`, f`Rusiy`, f`oldGray`].map((g) => ({
            name: g,
            action: (): void => this.setData("hairColor", g)
        }));

        return (
            <View>
                <TouchableOpacity onPress={this.toggle} style={styles.register.more.btn}>
                    <Text style={styles.register.more.text}>{f`Additional form`}</Text>
                    <Image source={ImageResources.icon_arr_down} style={styles.register.more.icon}/>
                </TouchableOpacity>

                <View style={{...styles.register.formRow, ...styles.register.formRowRow}}>
                    <View style={styles.register.formRowCell}>
                        <BottomMenu actions={eyeActions}>
                            <View style={BtnStyles.container}>
                                <View style={styles.register.dropDown.container}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            ...BtnStyles.text, ...{
                                                color: textBorderColor,
                                                maxWidth: (dWidth - 184) / 2
                                            }
                                        }}
                                    >{stores.registrationStore.data.eyeColor || f`eye color`}
                                    </Text>
                                    <Image style={styles.register.dropDown.icon} source={ImageResources.icon_arr_down}/>
                                </View>
                            </View>
                        </BottomMenu>
                    </View>
                    <View style={styles.register.formRowCell}>
                        <BottomMenu actions={hairActions}>
                            <View style={BtnStyles.container}>
                                <View style={styles.register.dropDown.container}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            ...BtnStyles.text, ...{
                                                color: textBorderColor,
                                                maxWidth: (dWidth - 184) / 2
                                            }
                                        }}
                                    >{stores.registrationStore.data.hairColor || f`hair color`}
                                    </Text>
                                    <Image style={styles.register.dropDown.icon} source={ImageResources.icon_arr_down}/>
                                </View>
                            </View>
                        </BottomMenu>
                    </View>
                </View>

                <View style={styles.register.formRow}>
                    <View style={styles.register.height.container}>
                        <Text
                            onLayout={this.setHeightLabelWidth}
                            style={styles.register.height.label}
                        >{f`Height`}
                        </Text>
                        <Text
                            onLayout={this.setHeightValueWidth}
                            style={{...styles.register.height.value, left: this.heightOffset}}
                        >
                            {stores.registrationStore.data.height}
                        </Text>
                    </View>
                    <Slider
                        value={stores.registrationStore.data.height}
                        onValueChange={this.setHeight}
                        onSlidingComplete={this.setHeight}
                        minimumValue={this.minHeight}
                        maximumValue={this.maxHeight}
                        maximumTrackTintColor={shadowColor}
                        minimumTrackTintColor={secondaryColor}
                        thumbTintColor={secondaryColor}
                        thumbStyle={{width: 8, height: 8}}
                        trackStyle={{height: 4, borderRadius: 2}}
                    />
                </View>
            </View>
        );
    }

    private setData<T>(key: keyof IRegistrationData): (value: T) => void;
    private setData<T>(key: keyof IRegistrationData, value: T): void;
    private setData<T>(key: keyof IRegistrationData, value?: T): ((value: T) => void) | void {
        if (value === undefined) {
            return (_value: T): void => this.setData(key, _value);
        }

        stores.registrationStore.data[key] = value;
    }
}

interface IRegisterProps extends INavigationProps {

}

interface IRegisterState {
    expanded: boolean;
    loading: boolean;
}
