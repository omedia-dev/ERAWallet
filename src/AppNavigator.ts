import {StackNavigator} from "react-navigation";
import {Import} from "./pages/Start/Import";
import {ImportPin} from "./pages/Start/ImportPin";
import {CreateWallet} from "./pages/Start/CreateWallet";
import {License} from "./pages/Start/License";
import {FirstLogin} from "./pages/Start/FirstLogin";
import {Complete} from "./pages/Start/Complete";
import {Login} from "./pages/Start/Login";
import {Main} from "./Main";
import {LocationSelector} from "./pages/LocationSelector";

export const AppNavigator = StackNavigator({
    CreateWallet: {screen: CreateWallet},
    Import: {screen: Import},
    ImportPin: {screen: ImportPin},
    License: {screen: License},
    FirstLogin: {screen: FirstLogin},
    Complete: {screen: Complete},
    Login: {screen: Login},
    LocationSelector: {screen: LocationSelector},

    Main: Main,
});
