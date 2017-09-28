import {Platform} from "react-native";
export class FontNames {
    static RobotoLight = "Roboto-Light";
    static RobotoRegular = "Roboto-Regular";
    static ProstoBold = "TTProstoSans-Bold";
    static ProstoLight =  (Platform.OS === 'ios') ? "TTProstoSans-Light" : "TTProstoSans-Light-Android";
    static ProstoRegular = (Platform.OS === 'ios') ? "TTProstoSans" : "TTProstoSans-Regular-Android";
}
