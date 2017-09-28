declare module "react-native-modal-picker" {
    import {TextStyle, ViewStyle} from "react-native";
    import {Component} from "react";

    export default class ModalPicker extends Component<IModalPickerProps, {}> {

    }

    export interface IModalPickerProps {
        /**
         *  required, array of objects with a unique key and label
         */
        data: { key: string, label: string }[];
        /**
         *  style definitions for the root element
         */
        style?: ViewStyle;
        /**
         *  callback function, when the users has selected an option
         */
        onChange?: (selected: { key: string, label: string }) => void;
        /**
         *  text that is initially shown on the button
         */
        initValue?: string;
        /**
         *  text of the cancel button
         */
        cancelText?: string;
        /**
         *  style definitions for the select element (available in default mode only!)
         */
        selectStyle?: ViewStyle;
        /**
         *  style definitions for the select element (available in default mode only!)
         */
        selectTextStyle?: TextStyle;
        /**
         *  style definitions for the overly/background element
         */
        overlayStyle?: ViewStyle;
        /**
         *  style definitions for the section element
         */
        sectionStyle?: ViewStyle;
        /**
         *  style definitions for the select text element
         */
        sectionTextStyle?: TextStyle;
        /**
         *  style definitions for the option element
         */
        optionStyle?: ViewStyle;
        /**
         *  style definitions for the option text element
         */
        optionTextStyle?: TextStyle;
        /**
         *  style definitions for the cancel element
         */
        cancelStyle?: ViewStyle;
        /**
         *  style definitions for the cancel text element
         */
        cancelTextStyle?: TextStyle;
    }
}
