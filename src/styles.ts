/* tslint:disable:no-object-literal-type-assertion no-magic-numbers*/

import {Dimensions, ImageStyle, Platform, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {AlignItems, FlexDirection, JustifyContent, Positions, TextAlign} from "./types/RNStyles";
import {FontNames} from "./common/FontNames";

export const textBorderColor = "#A1ACBA";
export const textPlaceholderColor = "#728196";
export const primaryColor = "#576373";
export const primaryColorLight = "#3DA2CF";
export const secondaryColor = "#375C98";
export const primaryColor2 = "#3B5998";
export const primaryColor3 = "#3F67A2";
export const shadowColor = "#EAE7E7";
export const whiteColor = "#FFFFFF";
export const lineLightColor = "#F6F6F6";
export const lineColor = "#E6EBF2";
export const menuItemBackgroudSelected = "#EFF2F5";
export const backgroundGray = "#EEF1F5";
export const transparentColor = "transparent";
export const slideMenuTextColor = "#666666";
export const sliderTransparentBackground = "#00000058";
export const peachColor = "#F58460";

const dimensions = Dimensions.get("window");
export const dWidth = dimensions.width;
export const dHeight = dimensions.height;
const dPaddingHorizontal = 24;
const dInfoItemHeight = 100;
const dNavigationBarHeight = 42;
const dMenuItemHeight = 46;
const dMenuIconLefpPadding = 24;

export const debugBorders = __DEV__ ? {
    borderWidth: 1,
    borderColor: "red"
} : {} as ViewStyle;

const avatarLargeSize = 70;
export const styles = {
    debugBorders: {...debugBorders},

    splash: {width: dWidth, height: dHeight, flex: 1, resizeMode: "cover"} as ImageStyle,

    container: {flex: 1, position: Positions.relative, backgroundColor: whiteColor} as ViewStyle,

    settings: {
        serverContainer: {
            flex: 1
        } as ViewStyle,
        serverLabelContainer: {marginVertical: 16} as ViewStyle,
        serverLabel: {
            color: secondaryColor,
            backgroundColor: transparentColor,
            fontSize: 16,
            lineHeight: 21,
            fontFamily: FontNames.ProstoLight
        } as TextStyle,
        serverItemContainer: {
            marginVertical: 8,
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.spaceBetween,
        } as ViewStyle,
        serverItemSubContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart,
        } as ViewStyle,
        dot: {
            backgroundColor: primaryColorLight,
            width: 5,
            height: 5,
            borderRadius: 2.5,
        } as ViewStyle,
        serverName: {
            color: textPlaceholderColor,
            backgroundColor: transparentColor,
            fontSize: 14,
            lineHeight: 18,
            fontFamily: FontNames.ProstoLight,
            marginLeft: 8
        } as TextStyle,
        serverDelete: {
            width: 24,
            height: 24,
        } as ImageStyle,
        serverAddImage: {
            width: 20,
            height: 20
        } as ImageStyle,
        serverAddContainer: {
            marginVertical: 16,
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart
        } as ViewStyle,
        serverAddLabel: {
            color: secondaryColor,
            backgroundColor: transparentColor,
            fontSize: 18,
            lineHeight: 23,
            fontFamily: FontNames.ProstoLight,
            marginLeft: 8
        } as TextStyle,

    },

    shared: {
        topBackgroundImage: {
            position: Positions.absolute,
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            width: dWidth
        } as ViewStyle,
        line: {
            backgroundColor: lineColor,
            height: 1,
            marginHorizontal: 0
        } as ViewStyle,
        hr: {
            borderBottomColor: lineColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
        } as ViewStyle,
    },
    geo: {
        container: {
            flex: 1,
            position: Positions.relative,
            backgroundColor: whiteColor,
        } as ViewStyle,
        contentContainer: {
            flex: 1,
            paddingHorizontal: 16
        } as ViewStyle,
        searchContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart,
            paddingVertical: 16,
            borderBottomColor: "#B6BFCB",
            borderBottomWidth: 1,
        } as ViewStyle,
        searchImage: {
            width: 19,
            height: 20,
            marginHorizontal: 8
        } as ViewStyle,
        searchText: {
            backgroundColor: transparentColor,
            fontFamily: FontNames.ProstoLight,
            fontSize: 14,
            color: textPlaceholderColor,
            flex: 1,
            paddingLeft: 8,
            textAlignVertical: AlignItems.center,
            alignSelf: AlignItems.center
        } as TextStyle,
        locationItemsListContainer: {
            paddingHorizontal: 8,
            paddingVertical: 8,
        } as ViewStyle,
        item: {
            container: {
                justifyContent: JustifyContent.spaceBetween,
            } as ViewStyle,
            textContainer: {
                paddingVertical: 8,
            } as ViewStyle,
            title: {
                backgroundColor: transparentColor,
                fontFamily: FontNames.ProstoRegular,
                fontSize: 16,
                color: secondaryColor,
                paddingVertical: 2
            } as TextStyle,
            subtitle: {
                backgroundColor: transparentColor,
                fontFamily: FontNames.ProstoRegular,
                fontSize: 16,
                color: textBorderColor,
                paddingVertical: 2
            } as TextStyle,
        }

    },
    transactionConfirm: {
        middleContainer: {
            backgroundColor: whiteColor,
            flex: 1,

        } as ViewStyle,
        messageContainer: {
            paddingVertical: 16,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart,

        } as ViewStyle,
        message: {
            textAlign: AlignItems.center,
            fontSize: 16,
            lineHeight: 18,
            color: textPlaceholderColor,
            backgroundColor: transparentColor,
            fontFamily: FontNames.ProstoRegular,
        } as TextStyle,
        headerInfoContainer: {
            alignItems: AlignItems.flexStart,
            justifyContent: JustifyContent.flexStart,
            paddingVertical: 8
        } as ViewStyle,
        receiver: {
            fontSize: 20,
            lineHeight: 26,
            color: secondaryColor,
            backgroundColor: transparentColor,
            fontFamily: FontNames.ProstoRegular

        } as TextStyle,
        account: {
            fontSize: 16,
            lineHeight: 21,
            color: textPlaceholderColor,
            backgroundColor: transparentColor,
            fontFamily: FontNames.ProstoRegular,
            marginTop: 16
        } as TextStyle,
        bottomInfoContainerTextStyle: {
            alignItems: AlignItems.flexStart,
            justifyContent: JustifyContent.flexStart,
        } as ViewStyle,
        textDesc: {
            fontSize: 16,
            lineHeight: 21,
            color: textPlaceholderColor,
            backgroundColor: transparentColor,
            fontFamily: FontNames.ProstoRegular,
            marginTop: 16
        } as TextStyle,

        buttonContainer: {
            paddingVertical: 4,
            paddingHorizontal: 8

        } as  ViewStyle,
        feeText: {
            fontSize: 16,
            lineHeight: 21,
            color: primaryColorLight,
            backgroundColor: transparentColor,
            fontFamily: FontNames.ProstoRegular,
            marginVertical: 16,
            textAlign: TextAlign.center,
        } as TextStyle,
        warningText: {
            fontSize: 16,
            lineHeight: 21,
            color: peachColor,
            backgroundColor: transparentColor,
            fontFamily: FontNames.ProstoRegular,
            textAlign: AlignItems.center
        } as TextStyle
    },
    transactionDetail: {
        container: {flex: 1, backgroundColor: whiteColor, paddingVertical: 8, paddingHorizontal: 16} as ViewStyle,
        subContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart,
            marginVertical: 8
        } as ViewStyle,
        title: {
            color: secondaryColor,
            backgroundColor: transparentColor,
            fontSize: 16,
            lineHeight: 21,
            fontFamily: FontNames.ProstoLight
        } as TextStyle,
        value: {
            flex: 1,
            color: textPlaceholderColor,
            backgroundColor: transparentColor,
            fontSize: 16,
            lineHeight: 21,
            fontFamily: FontNames.ProstoLight,
            marginLeft: 8
        } as TextStyle,
    },

    login: {
        containerTop: {
            position: Positions.relative,
            flex: 1,
            // paddingBottom: bottomTiltSize.height,
        } as ViewStyle,

        largeLogo: {
            flex: 1,
            backgroundColor: primaryColor,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.center
        } as ViewStyle,
        bottomContainer: {
            // position: Positions.absolute,
            // bottom: 0,
            // left: 0,
            // right: 0,
            height: 60,
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.stretch,
            justifyContent: JustifyContent.center
        } as ViewStyle,
        web: {
            borderColor: textBorderColor,
            borderWidth: 1,
            borderRadius: 4,
            flex: 1,
            paddingHorizontal: 8,
            paddingVertical: 8,
        } as ViewStyle,
        largeLogoBackgroundImage: {
            flex: 1,
            width: dWidth,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.center,
            // paddingHorizontal: 32,
            // paddingTop: 126,
            // paddingBottom: 158
        } as ViewStyle,
        logo: {
            height: (dWidth - 64) / 5,
            width: dWidth - 64,
        } as ImageStyle,
        message: {
            color: textPlaceholderColor,
            fontSize: 16,
            fontFamily: FontNames.ProstoRegular,
            paddingHorizontal: 32,
            textAlign: "center",
            lineHeight: 26,
            marginBottom: 32
        } as TextStyle,
        bottomTilt: {
            position: Positions.absolute,
            bottom: -40,
            height: 75,
            width: dWidth * 1.2,
            backgroundColor: "#fff",
            transform: [
                {skewY: "-10deg"}
            ],
        } as ImageStyle,

        register: {
            btn: {position: Positions.absolute, right: 52, bottom: 25} as ViewStyle,
            icon: {} as ImageStyle,
        },

        containerBottom: {
            flex: 1,
            backgroundColor: "#fff",
            flexDirection: FlexDirection.column,
            justifyContent: JustifyContent.flexStart,
            paddingHorizontal: 32,
            paddingTop: 32

        } as ViewStyle,
        containerBottomLicence: {
            flex: 1,
            backgroundColor: "#fff",
            flexDirection: FlexDirection.column,
            justifyContent: JustifyContent.flexStart,
            paddingHorizontal: 16,
            paddingTop: 16

        } as ViewStyle,
        containerBottomComplete: {
            flex: 1,
            backgroundColor: "#fff",
            flexDirection: FlexDirection.column,
            justifyContent: JustifyContent.flexStart,
        } as ViewStyle,

        containerForm: {
            alignItems: AlignItems.center,
            position: Positions.relative,
            justifyContent: JustifyContent.center,
            flexDirection: FlexDirection.row,
            marginBottom: 25
        } as ViewStyle,

        containerBtn: {
            flexDirection: FlexDirection.row,
            justifyContent: JustifyContent.center,
            width: 230,
        } as ViewStyle,

        placeholder: {
            backgroundColor: "transparent",
            position: Positions.absolute,
            fontFamily: FontNames.ProstoLight,
            fontSize: 16,
            color: primaryColor,
            height: 30
        } as TextStyle,

        inputShow: {
            position: Positions.absolute,
            flexDirection: FlexDirection.row,
            justifyContent: JustifyContent.spaceBetween,
            width: 230,
        } as ViewStyle,

        digit: {
            width: 40,
            height: 50,
            borderBottomColor: textPlaceholderColor,
            borderBottomWidth: 1,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.center,
        } as ViewStyle,

        input: {
            backgroundColor: "transparent",
            opacity: 0.1,
            color: "#fff",
            borderColor: "#fff",
            fontSize: 5,
            width: 230,
            height: 50,
            borderWidth: 1
        } as TextStyle,

        digitValue: {
            backgroundColor: "transparent",
            fontSize: 50,
            fontFamily: FontNames.ProstoLight
        } as TextStyle
    },

    register: {
        top: {height: dHeight / 2} as ViewStyle,
        bottom: {flex: 1, backgroundColor: "#fff", paddingHorizontal: 32} as ViewStyle,
        icon_pin: {
            tintColor: primaryColor2,
            width: 12,
            height: 18
        } as ImageStyle,
        userImageSelect: {
            marginBottom: 17,
            marginTop: 24
        } as ViewStyle,
        exContainer: {
            position: Positions.absolute,
            top: 16,
            right: 16
        } as ViewStyle,
        exPoint: {
            width: 24,
            height: 24,
        } as ImageStyle,
        square: {width: 18, height: 18, backgroundColor: secondaryColor, borderRadius: 4} as ViewStyle,
        aceptContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart
        } as ViewStyle,
        button1: {
            position: Positions.absolute,
            top: 8,
            right: 8,
            bottom: 8,

        } as ViewStyle,
        aceptSquareBorder: {
            width: 24,
            height: 24,
            marginVertical: 16,
            borderColor: textBorderColor,
            borderWidth: 1,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.center,
            borderRadius: 4
        } as ViewStyle,
        liceseText: {
            color: secondaryColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 20,
            marginBottom: 16,
            textAlignVertical: "center",
            lineHeight: 20
        } as TextStyle,
        aceptText: {
            color: textPlaceholderColor,
            backgroundColor: transparentColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 16,
            marginLeft: 8
        } as TextStyle,
        buttonContinue: {
            backgroundColor: primaryColor3,
            flexDirection: FlexDirection.row,
            flex: 1,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.center,
        } as ViewStyle,
        completeBigMessage: {
            fontSize: 14,
            color: textBorderColor,
            backgroundColor: transparentColor,
            lineHeight: Platform.OS == "ios" ? 16 : 24,
            fontFamily: FontNames.ProstoRegular,
            textAlign: "center",
            paddingVertical: 24
        } as TextStyle,
        bottomContainer: {
            position: Positions.absolute,
            bottom: 0,
            left: 0,
            right: 0,
            height: 70,
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.stretch,
            justifyContent: JustifyContent.center
        } as ViewStyle,
        buttonText: {
            color: whiteColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 18,
            marginHorizontal: 10,
            backgroundColor: transparentColor,
            lineHeight: 21
        } as TextStyle,
        buttonNextDisabledText: {
            color: textPlaceholderColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 18,
            marginHorizontal: 10,
            backgroundColor: transparentColor,
            lineHeight: 21
        } as TextStyle,
        copyButtonText: {
            flex: 1,
            textAlign: "center",
            textAlignVertical: "center",
            color: textPlaceholderColor
        } as TextStyle,
        message: {
            color: textPlaceholderColor,
            fontSize: 16,
            lineHeight: 18,
            fontFamily: FontNames.ProstoRegular,
            textAlign: "center",
            width: 200,
            alignSelf: "center"
        } as TextStyle,

        formRow: {marginVertical: 7} as ViewStyle,
        formRowRow: {
            flex: 1,
            alignItems: AlignItems.stretch,
            flexDirection: FlexDirection.row,
            marginHorizontal: -9
        } as ViewStyle,
        formRowCell: {flex: 1, marginHorizontal: 9} as ViewStyle,
        textInput: {
            backgroundColor: "transparent",
            borderColor: textBorderColor,
            borderWidth: 1,
            borderRadius: 4,
            height: 47,
            lineHeight: 20,
            fontSize: 16,
            fontFamily: FontNames.ProstoLight,
            paddingRight: 46,
            paddingLeft: 16,
            textAlignVertical: AlignItems.center,
            color: textBorderColor,
            ...Platform.select({
                ios: {
                    paddingTop: 11,
                    paddingBottom: 14,
                },
                android: {
                    paddingTop: 12,
                    paddingBottom: 13,
                }
            }),
        } as TextStyle,

        textInputDescription: {
            backgroundColor: "transparent",
            borderColor: textBorderColor,
            borderWidth: 1,
            borderRadius: 4,
            height: 94,
            lineHeight: 21,
            fontSize: 16,
            fontFamily: FontNames.ProstoLight,
            paddingHorizontal: 16,
            alignContent: AlignItems.flexStart,
            textAlignVertical: "top",
            color: textBorderColor
        } as TextStyle,
        textInputLocation: {
            backgroundColor: "transparent",
            paddingLeft: 34
        } as TextStyle,
        wholeContainer: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            backgroundColor: sliderTransparentBackground
        } as ViewStyle,
        menuBackground: {
            backgroundColor: sliderTransparentBackground,
            flex: 1,
            height: dHeight,
            position: Positions.absolute,
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
        } as ViewStyle,
        menuContainer: {
            borderRadius: 4,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
            backgroundColor: whiteColor,
            marginHorizontal: 30,
        } as ViewStyle,
        menuScrollView: {} as ViewStyle,
        menuCancelContainer: {
            position: Positions.absolute,
            left: 16,
            right: 16,
            bottom: 36,
            backgroundColor: whiteColor,
            borderRadius: 4
        } as ViewStyle,
        menuItemContainer: {
            flexDirection: FlexDirection.row,
            paddingVertical: 16,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart,
            height: 45,
        } as ViewStyle,
        menuText: {
            backgroundColor: "transparent",
            marginLeft: 24,
            color: slideMenuTextColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 16,
            lineHeight: 20,
        } as TextStyle,
        menuIcon: {} as ImageStyle,
        button: {
            position: Positions.absolute,
            right: 0,
            height: 47,
            width: 47,
            alignItems: "center",
            justifyContent: "center"
        } as ViewStyle,
        image: {
            width: 18,
            height: 22
        } as ViewStyle,

        dropDown: {
            container: {
                flex: 1,
                flexDirection: FlexDirection.row,
                justifyContent: JustifyContent.spaceBetween,
                alignItems: AlignItems.center
            } as ViewStyle,
            icon: {
                width: 15,
                height: 8
            }  as ImageStyle
        },

        more: {
            btn: {
                marginVertical: 7,
                paddingHorizontal: 9,
                flexDirection: FlexDirection.row,
                alignItems: AlignItems.center,
                justifyContent: JustifyContent.flexEnd
            } as ViewStyle,
            icon: {marginRight: 9, marginLeft: 12} as ImageStyle,
            iconRight: {marginRight: 9, transform: [{rotate: "-90deg"}], marginLeft: 12} as ImageStyle,
            text: {
                backgroundColor: "transparent",
                textAlign: TextAlign.right,
                fontFamily: FontNames.ProstoRegular,
                fontSize: 16,
                color: secondaryColor
            } as TextStyle,
            textOpen: {
                backgroundColor: "transparent",
                textAlign: TextAlign.center,
                fontFamily: FontNames.ProstoRegular,
                fontSize: 18,
                color: secondaryColor
            } as TextStyle,
        },

        height: {
            container: {
                position: Positions.relative,
                alignItems: AlignItems.flexStart,
                justifyContent: JustifyContent.center
            } as ViewStyle,
            label: {
                fontFamily: FontNames.ProstoLight,
                fontSize: 16,
                color: textPlaceholderColor,
                backgroundColor: "transparent",
            } as TextStyle,
            value: {
                backgroundColor: "transparent",
                position: Positions.absolute,
                fontFamily: FontNames.ProstoRegular,
                fontSize: 12,
                color: textPlaceholderColor
            } as TextStyle,
        },
    },

    myWallet: {
        container: {
            flex: 1,
            backgroundColor: whiteColor,
            marginBottom: 60,
            paddingHorizontal: 16,
        } as ViewStyle,
        topContainer: {
            flexDirection: FlexDirection.row,
            width: dWidth,
            height: dInfoItemHeight,
            paddingVertical: dPaddingHorizontal,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.spaceBetween
        } as ViewStyle,
        textSubContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.spaceBetween,
            height: 42,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: textBorderColor,
            marginTop: 8,
            paddingHorizontal: 8
        } as ViewStyle,
        textsubSubContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart,
        } as ViewStyle,
        noHistoryText: {
            backgroundColor: "transparent",
            color: primaryColor2,
            fontFamily: FontNames.ProstoLight,
            fontSize: 12,
        } as TextStyle,
        currencyNameBottom: {
            backgroundColor: "transparent",
            color: primaryColor2,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 20,
        } as TextStyle,
        dropDownIcon: {
            width: 12,
            height: 7,
            tintColor: secondaryColor
        }  as ImageStyle,
        currencyValueBottom: {
            backgroundColor: transparentColor,
            color: primaryColor2,
            fontFamily: FontNames.ProstoLight,
            fontSize: 20,
            marginLeft: 8
        } as TextStyle,
        bottomContainer: {
            position: Positions.absolute,
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.stretch,
            justifyContent: JustifyContent.center
        } as ViewStyle,
        buttonLeft: {
            backgroundColor: primaryColor3,
            flexDirection: FlexDirection.row,
            flex: 1,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.center,
        } as ViewStyle,
        buttonRight: {
            backgroundColor: primaryColor2,
            flexDirection: FlexDirection.row,
            flex: 1,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.center

        } as ViewStyle,
        buttonText: {
            color: whiteColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 18,
            marginHorizontal: 10,
            lineHeight: 23
        } as TextStyle,
        buttonImage: {
            width: 30,
            height: 30
        } as ViewStyle,
        balanceContainer: {
            flexDirection: FlexDirection.row,
            justifyContent: JustifyContent.spaceBetween,
            alignItems: AlignItems.flexStart,
            paddingTop: 13
        } as ViewStyle,
        refreshImage: {
            tintColor: whiteColor,
            width: 30,
            height: 30,

        } as ImageStyle,
        refreshButton: {
            backgroundColor: primaryColor3,
            width: 42,
            height: 42,
            borderRadius: 4,
            justifyContent: JustifyContent.center,
            alignItems: AlignItems.center,
            marginTop: 8
        } as ViewStyle,

    },

    myContacts: {
        container: {
            backgroundColor: whiteColor,
            flex: 1
        } as ViewStyle,
        topBackgroundImage: {
            position: Positions.absolute,
            top: 0,
            left: 0,
            right: 0,
            height: 178,
            width: dWidth
        } as ViewStyle,
        contentContainer: {
            paddingHorizontal: 16,
            flex: 1
        } as ViewStyle,
        buttonsContainer: {
            position: Positions.absolute,
            left: 36,
            right: 35,
            bottom: 16
        } as ViewStyle,
        formRow: {marginVertical: 4} as ViewStyle,

    },

    userPlus: {
        container: {
            backgroundColor: whiteColor,
            flex: 1
        } as ViewStyle,
        subContainer: {
            paddingHorizontal: 16,
        } as ViewStyle,
        textInput: {
            backgroundColor: whiteColor,
            borderRadius: 4,
            color: textPlaceholderColor,
            lineHeight: 20,
            fontSize: 16,
            fontFamily: FontNames.ProstoLight,
            paddingHorizontal: 10,
            paddingVertical: 5,
            paddingRight: 50,
            height: 139,
            justifyContent: JustifyContent.flexStart,
            alignContent: AlignItems.flexStart,
            textAlignVertical: "top",
            borderWidth: 1,
            borderColor: textBorderColor
        } as TextStyle,
        button: {
            position: Positions.absolute,
            top: 8,
            right: 8,
            zIndex: 10,
            width: 28,
            height: 30
        } as ViewStyle,
        image: {
            width: 28,
            height: 30
        } as ViewStyle,
    },

    sent: {
        container: {
            backgroundColor: whiteColor,
            flex: 1
        } as ViewStyle,
        dropDown: {
            backgroundColor: whiteColor,
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.spaceBetween,
            paddingVertical: 8,
            paddingHorizontal: 8,
            height: 48,
            borderColor: textBorderColor,
            borderWidth: 1,
            borderRadius: 4,
            marginBottom: 8
        } as ViewStyle,
        invisiableButton: {
            position: Positions.absolute,
            top: 0,
            bottom: 0,
            left: 40,
            right: 0,
        } as ViewStyle,
        dropDownText: {

            color: textBorderColor,
            lineHeight: 20,
            fontSize: 16,
            fontFamily: FontNames.ProstoRegular,
            justifyContent: JustifyContent.flexStart,
            alignContent: AlignItems.flexStart,
        } as ViewStyle,
        subContainer: {
            flex: 1,
        } as ViewStyle,
        imageButton: {
            width: 18,
            height: 18
        } as ImageStyle,
        textContainer: {
            paddingVertical: 8
        } as ViewStyle,
        buttonsContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.flexStart,
            justifyContent: JustifyContent.spaceBetween
        } as ViewStyle,
        buttonsSubContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart
        } as ViewStyle,
        textInput: {
            backgroundColor: whiteColor,
            color: textBorderColor,
            lineHeight: 20,
            fontSize: 16,
            fontFamily: FontNames.ProstoRegular,
            paddingLeft: 8,
            paddingRight: 16,
            paddingTop: 12,
            paddingBottom: 13,
            height: 47,
            justifyContent: JustifyContent.flexStart,
            alignContent: AlignItems.flexStart,
            borderColor: textBorderColor,
            borderWidth: 1,
            borderRadius: 4,
            textAlignVertical: AlignItems.center
        } as TextStyle,
        textButton: {
            backgroundColor: transparentColor,
            color: textPlaceholderColor,
            lineHeight: 14,
            fontSize: 14,
            fontFamily: FontNames.ProstoRegular,
            marginLeft: 8
        } as TextStyle,
        titleMessage: {
            backgroundColor: "transparent",
            color: primaryColor2,
            fontFamily: FontNames.ProstoLight,
            fontSize: 20,
        } as TextStyle,
        textCommentInput: {
            height: 103,
            textAlignVertical: "top"
        } as TextStyle,
        button: {
            position: Positions.absolute,
            top: 16,
            right: 8,
            bottom: 16
        } as ViewStyle,
        button1: {
            position: Positions.absolute,
            top: 8,
            right: 0,
            bottom: 8,
            paddingTop: 8,
            paddingRight: 8,
            paddingBottom: 8,

        } as ViewStyle,
        image: {
            width: 18,
            height: 22,
        } as ViewStyle,
        titleContainer: {
            paddingVertical: 12,
            alignItems: AlignItems.flexStart,
            justifyContent: JustifyContent.spaceAround,
        } as ViewStyle,
        title: {
            backgroundColor: "transparent",
            color: secondaryColor,
            fontFamily: FontNames.ProstoLight,
            fontSize: 16,
        } as TextStyle,
        userContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.spaceBetween
        } as ViewStyle,
        iconCheck: {
            tintColor: primaryColorLight,
        } as ImageStyle
    },

    search: {
        container: {
            backgroundColor: whiteColor,
            flex: 1,
        } as ViewStyle,

        searchContainer: {
            height: 50,
            paddingHorizontal: 2,
            paddingVertical: 8,
            borderBottomColor: "#B6BFCB",
            borderBottomWidth: 1,
            justifyContent: JustifyContent.center,
        } as ViewStyle,
        searchTextInput: {
            borderRadius: 5,
            lineHeight: 20,
            fontSize: 16,
            fontFamily: FontNames.ProstoLight,
            paddingHorizontal: 10,
            paddingLeft: 40,
            backgroundColor: whiteColor,
            paddingVertical: 0,
            color: textPlaceholderColor,
            height: 28
        } as TextStyle,
        usersListContainer: {
            flex: 1,
        } as ViewStyle,
        searchIcon: {
            position: Positions.absolute,
            left: 4,
            top: 12,
            bottom: 12,
            width: 24,
            height: 24
        } as ViewStyle

    },

    identification: {
        container: {
            backgroundColor: whiteColor,
            flex: 1,
        } as ViewStyle,
        top: {
            height: dHeight / 2
        } as ViewStyle,
        bottom: {
            paddingHorizontal: 24,
            justifyContent: JustifyContent.spaceAround,
            flex: 1
        } as ViewStyle,
        statusIdentificationHead: {
            backgroundColor: "transparent",
            color: whiteColor,
            fontFamily: FontNames.ProstoLight,
            fontSize: 16,
            letterSpacing: -0.32,
            position: Positions.absolute,
            bottom: 16,
            left: 0,
            right: 0,
            textAlign: AlignItems.center
        } as TextStyle,
        textContainer: {
            paddingHorizontal: 38,
            paddingTop: 24

        } as ViewStyle,
        textSubcontainer: {
            paddingVertical: 16,
            flexDirection: FlexDirection.row,
        } as ViewStyle,
        statusIdentificationBottomText: {
            backgroundColor: "transparent",
            color: secondaryColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 20,
        } as TextStyle,
        buttonContainer: {
            paddingHorizontal: 8
        } as ViewStyle,
        buttonsLinksContainer: {
            paddingVertical: 24,
            flexDirection: FlexDirection.row,
            justifyContent: JustifyContent.spaceBetween,
            alignItems: AlignItems.center
        } as ViewStyle,
        cancelText: {
            backgroundColor: "transparent",
            color: textPlaceholderColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 16,
        } as TextStyle,
        licenseText: {
            backgroundColor: "transparent",
            color: primaryColorLight,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 16,
        } as TextStyle,
        licenseLineText: {
            backgroundColor: primaryColorLight,
            height: 1
        } as ViewStyle,
        btnText: {
            backgroundColor: "transparent",
            fontFamily: FontNames.ProstoRegular,
            fontSize: 16,
            color: whiteColor,
            marginLeft: 14
        } as TextStyle,
        iconOk: {
            tintColor: primaryColor2,
            marginLeft: 16,
            width: 25,
            height: 25
        } as ImageStyle,

    },

    contacts: {
        container: {
            backgroundColor: whiteColor,
            flex: 1,

        } as ViewStyle,

    },

    userProfile: {
        contentContainer: {
            paddingBottom: 60
        } as ViewStyle,
        buttonsContainer: {
            paddingHorizontal: 35,
            paddingBottom: 8
        } as ViewStyle,
    },

    userListItem: {
        container: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart,
            paddingVertical: 8
        } as ViewStyle,
        textContainer: {
            flex: 1,
            marginLeft: 24,
            alignItems: AlignItems.flexStart,
            justifyContent: JustifyContent.spaceAround
        } as ViewStyle,
        image: {
            width: 50,
            height: 50,
            borderRadius: 25,
        } as ViewStyle,
        spinner: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: textBorderColor
        } as ViewStyle,
        name: {
            backgroundColor: "transparent",
            color: primaryColorLight,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 16,
        } as TextStyle,
        id: {
            backgroundColor: "transparent",
            color: textBorderColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 12,
        } as  TextStyle,

    },

    registerTabs: {
        container: {
            position: Positions.absolute,
            bottom: 0,
            width: dWidth,
            flexDirection: FlexDirection.row,
        } as ViewStyle,
        tab: {
            paddingVertical: 16,
            alignItems: "center",
            opacity: 0.62,
            flex: 1
        } as ViewStyle,
        tabActive: {
            opacity: 1,
        } as ViewStyle,
        text: {
            backgroundColor: "transparent",
            color: "#fff",
            fontFamily: FontNames.ProstoRegular,
            fontSize: 16,
        } as TextStyle,
    },

    backBtn: {
        container: {
            width: 48,
            height: 48,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.center,
            top: 25,
            left: 0,
            zIndex: 1,
        } as ViewStyle,
        icon: {width: 22, height: 22} as ImageStyle,
    },

    backgroundImage: {
        flex: 1,
        alignSelf: AlignItems.stretch,
        width: null,
        height: null,
        ...debugBorders,
    } as ImageStyle,

    userImage: {
        container: {
            alignItems: AlignItems.center,
        } as ViewStyle,
        image: {
            borderColor: secondaryColor,
            borderWidth: 2,
            width: 90,
            height: 90,
            borderRadius: 45
        } as ImageStyle,
    },
    dots: {
        container: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.flexEnd,
            justifyContent: JustifyContent.flexStart,
            paddingHorizontal: 3,
            paddingBottom: 5

        } as ViewStyle,
        dot: {
            backgroundColor: textBorderColor,
            width: 4,
            height: 4,
            marginHorizontal: 3,
            borderRadius: 2
        } as ViewStyle,
    },

    userImageSelect: {
        container: {alignItems: AlignItems.center, justifyContent: JustifyContent.flexStart} as ViewStyle,
        text: {
            backgroundColor: "transparent",
            lineHeight: 19,
            fontSize: 16,
            fontFamily: FontNames.ProstoRegular,
            color: secondaryColor,
            marginTop: 13
        } as TextStyle,
    },

    userDataPanel: {
        container: {
            paddingVertical: dPaddingHorizontal,
            height: 76,
            flexDirection: FlexDirection.row,
            justifyContent: JustifyContent.spaceBetween,
            alignItems: AlignItems.center,
            paddingHorizontal: 24,
        } as ViewStyle,
        title: {
            backgroundColor: "transparent",
            color: primaryColor2,
            fontFamily: FontNames.ProstoLight,
            fontSize: 20,
        } as TextStyle,
        dataRow: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart,
            paddingVertical: 4

        } as ViewStyle,
        image: {
            width: 24,
            height: 24,

        } as ViewStyle,
        text: {
            backgroundColor: "transparent",
            fontFamily: FontNames.ProstoLight,
            fontSize: 16,
            color: textBorderColor,
            marginLeft: 16,
            maxWidth: dWidth * 0.8

        } as TextStyle,
        account: {
            fontFamily: FontNames.ProstoLight,
            fontSize: 16,
            color: textPlaceholderColor,
            lineHeight: 18
        } as TextStyle,
    },

    navigationBar: {
        container: {
            backgroundColor: transparentColor,
            height: dNavigationBarHeight,
            alignItems: AlignItems.stretch,
            justifyContent: JustifyContent.center,
            marginTop: 22,
        } as ViewStyle,
        iconButton: {
            width: 44,
            height: 44,
            resizeMode: "center",
        } as ImageStyle,
        navigationHeader: {
            width: dWidth,
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.spaceBetween,
        } as ViewStyle,
        title: {
            backgroundColor: "transparent",
            fontSize: 16,
            fontFamily: FontNames.ProstoRegular,
            color: whiteColor,
            maxWidth: dWidth*0.6
        } as TextStyle
    },

    menu: {
        spinner: {
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 2,
            borderColor: whiteColor,
            backgroundColor: textBorderColor
        } as ViewStyle,
        item: {
            container: {
                height: dMenuItemHeight,

            } as ViewStyle,

            leftLine: {
                width: 2,
                backgroundColor: secondaryColor,
                position: Positions.absolute,
                top: 0,
                bottom: 0,
                left: 0
            } as ViewStyle,
            button: {
                height: dMenuItemHeight,
                alignItems: AlignItems.center,
                justifyContent: JustifyContent.flexStart,
                flexDirection: FlexDirection.row
            } as ViewStyle,
            icon: {
                marginLeft: dMenuIconLefpPadding,
            } as ViewStyle,
            title: {
                backgroundColor: "transparent",
                marginLeft: dMenuIconLefpPadding,
                fontSize: 16,
                fontFamily: FontNames.ProstoLight,
                color: textPlaceholderColor,
                maxWidth: dWidth * .6
            } as TextStyle
        },
        container: {
            flex: 1,
            position: Positions.relative,
            backgroundColor: whiteColor,
        } as ViewStyle,
        textContainer: {
            marginTop: 40,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart
        } as ViewStyle,
        backgroundImage: {
            width: dWidth,
            height: 150,
        } as ViewStyle,
        backgroundEmpty: {
            flex: 1,
            backgroundColor: whiteColor,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.center,
            paddingTop: 20,
        } as ViewStyle,
        userView: {
            position: Positions.absolute,
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart,
            paddingTop: 90

        } as ViewStyle,
        userImage: {
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 4,
            borderColor: whiteColor,
        } as ViewStyle,
        userName: {
            backgroundColor: "transparent",
            fontSize: 18,
            fontFamily: FontNames.ProstoRegular,
            color: primaryColor2,
            lineHeight: 23,
            marginTop: 4,
            textAlign: AlignItems.center
        } as TextStyle,
        userKey: {
            backgroundColor: "transparent",
            fontSize: 14,
            fontFamily: FontNames.ProstoRegular,
            color: primaryColorLight,
            lineHeight: 18
        } as TextStyle,
        userStatus: {
            backgroundColor: "transparent",
            fontSize: 14,
            fontFamily: FontNames.ProstoRegular,
            color: primaryColorLight,
            lineHeight: 18,
            marginTop: 4
        } as TextStyle,
        userEditButton: {
            position: Positions.absolute,
            top: 8,
            right: 8,
        } as ViewStyle,
        itemsContainer: {
            backgroundColor: whiteColor,
            flex: 1
        } as ViewStyle,
        settingsContainer: {} as ViewStyle,
        settingsLineTop: {} as ViewStyle,
        settingsIcon: {
            marginLeft: dMenuIconLefpPadding,

        } as ViewStyle,
        settingsText: {
            marginLeft: dMenuIconLefpPadding,
        } as ViewStyle,
        line: {
            position: Positions.absolute,
            left: 0,
            right: 0,
            top: 0,
            height: 1,
            backgroundColor: lineLightColor
        } as ViewStyle

    },

    infoItem: {
        container: {
            height: dInfoItemHeight,
            paddingVertical: dPaddingHorizontal,
            alignItems: AlignItems.flexStart,
            justifyContent: JustifyContent.spaceAround,
        } as ViewStyle,
        title: {
            backgroundColor: "transparent",
            color: primaryColor2,
            fontFamily: FontNames.ProstoLight,
            fontSize: 20,
        } as TextStyle,
        value: {
            backgroundColor: "transparent",
            color: textPlaceholderColor,
            fontFamily: FontNames.ProstoLight,
            fontSize: 14,
            flex: 10,

        } as TextStyle,
        valueContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.spaceBetween,
            alignSelf: AlignItems.stretch
        } as ViewStyle,
        button: {
            width: 30,
            height: 30,
            flex: 1
        } as ViewStyle,
    },

    contactInfo: {
        container: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart,
            paddingHorizontal: 24,
            paddingBottom: 16,
            paddingTop: 16,
        } as ViewStyle,
        avatar: {
            width: avatarLargeSize,
            height: avatarLargeSize,
            borderRadius: 35,
            borderWidth: 1,
            borderColor: whiteColor,
        } as ViewStyle,
        spinner: {
            width: 70,
            height: 70,
            borderRadius: 35,
            borderWidth: 1,
            borderColor: whiteColor,
            backgroundColor: textBorderColor
        } as ViewStyle,
        infoPanel: {
            paddingLeft: 24,
            alignItems: AlignItems.flexStart,
            justifyContent: JustifyContent.center
        } as ViewStyle,
        nameText: {
            backgroundColor: "transparent",
            color: whiteColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 18,
            width: dWidth - avatarLargeSize - 24 * 2,
        } as TextStyle,
        key: {
            backgroundColor: "transparent",
            color: whiteColor,
            fontFamily: FontNames.ProstoLight,
            fontSize: 12,
        } as TextStyle,
        line: {
            height: 1,
            width: 133,
            backgroundColor: textBorderColor,
            marginVertical: 4
        } as ViewStyle,
        infoBottomContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.flexStart
        } as ViewStyle,
        iconPin: {
            height: 14,
            width: 9.8,
            tintColor: whiteColor,
            marginLeft: 8,
            marginRight: 4
        } as ImageStyle,
        bottomText: {
            color: whiteColor,
            fontFamily: FontNames.ProstoLight,
            fontSize: 14,
            maxWidth: 100,
            backgroundColor: "transparent",
        } as ViewStyle,

    },

    historyItem: {
        container: {
            paddingVertical: 16
        } as ViewStyle,
        dateSumContainer: {
            flexDirection: FlexDirection.row,
            alignItems: AlignItems.center,
            justifyContent: JustifyContent.spaceBetween,
        } as ViewStyle,
        image: {
            width: 24,
            height: 24
        } as ViewStyle,
        date: {
            backgroundColor: "transparent",
            color: secondaryColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 14,
            lineHeight: 18,
        } as TextStyle,
        confirmation: {
            backgroundColor: "transparent",
            color: primaryColorLight,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 12,
            lineHeight: 16,
            marginTop: 8
        } as TextStyle,
        header: {
            backgroundColor: "transparent",
            color: textPlaceholderColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 14,
            lineHeight: 18,
            marginTop: 8
        } as TextStyle,
        sum: {
            backgroundColor: "transparent",
            color: primaryColor2,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 14,
            alignSelf: AlignItems.flexEnd,
            lineHeight: 18,
        } as TextStyle,
        bottomContainer: {
            flexDirection: FlexDirection.row,
            justifyContent: JustifyContent.spaceBetween,
            alignItems: AlignItems.flexEnd,
            height: 24

        } as ViewStyle,
        bottomLeftContainer: {
            flexDirection: FlexDirection.row,
            justifyContent: JustifyContent.flexStart
        } as ViewStyle,
        accountLabel: {
            backgroundColor: "transparent",
            color: primaryColorLight,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 14,
            lineHeight: 18
        } as TextStyle,
        account: {
            backgroundColor: "transparent",
            color: textPlaceholderColor,
            fontFamily: FontNames.ProstoRegular,
            fontSize: 14,
            lineHeight: 18,
            marginLeft: 8
        } as TextStyle,
    }
};
