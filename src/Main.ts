import {DrawerNavigator} from "react-navigation";
import {MyWallet} from "./pages/Wallet/MyWallet";
import {Send} from "./pages/Wallet/Send/Send";
import {PersonsLocal} from "./pages/Persons/PersonsLocal";
import {MyProfile} from "./pages/MyAccount";
import {Menu} from "./pages/Menu";
import {Registration} from "./pages/Registration";
import {Settings} from "./pages/Settings";
import {UserProfile} from "./pages/Persons/UserProfile";
import {IdentificationPreview} from "./pages/Identification/IdentificationPreview";
import {Declare} from "./pages/Declare/Declare";
import {AssetsLocal} from "./pages/Assets/AssetsLocal";
import {AssetsRemote} from "./pages/Assets/AssetsRemote";
import {TransactionDetail} from "./pages/Wallet/TransactionDetail";
import {PersonsRemote} from "./pages/Persons/PersonsRemote";
import {Identification} from "./pages/Identification/Identification";
import {SendSearchAssets} from "./pages/Wallet/Send/SendSearchAssets";
import {SendSearchPerson} from "./pages/Wallet/Send/SendSearchPerson";
import {SendSearchPersonRemote} from "./pages/Wallet/Send/SendSearchPersonRemote";
import {SendResult} from "./pages/Wallet/Send/SendResult";
import {IdentificationState} from "./pages/Identification/IdentificationState";
import {TransactionConfirm} from "./pages/Wallet/Send/TransactionConfirm";
import {DeclareUserPreview} from "./pages/Declare/DeclareUserPreview";
import {SendUserPreview} from "./pages/Wallet/Send/SendUserPreview";
import {DeclareResult} from "./pages/Declare/DeclareResult";

export class Main {
    static screen = DrawerNavigator({
        MyWallet: {screen: MyWallet},
        TransactionDetail: {screen: TransactionDetail},

        Send: {screen: Send},
        SendResult: {screen: SendResult},
        SendSearchAssets: {screen: SendSearchAssets},
        SendSearchAssetsRemote: {screen: AssetsRemote},
        SendSearchPerson: {screen: SendSearchPerson},
        SendSearchPersonRemote: {screen: SendSearchPersonRemote},
        SendUserPreview: {screen: SendUserPreview},
        TransactionConfirm: {screen: TransactionConfirm},

        MyProfile: {screen: MyProfile},

        PersonsLocal: {screen: PersonsLocal},
        PersonsRemote: {screen: PersonsRemote},
        UserProfile: {screen: UserProfile},

        AssetsLocal: {screen: AssetsLocal},
        AssetsRemote: {screen: AssetsRemote},

        Identification: {screen: Identification},
        IdentificationPreview: {screen: IdentificationPreview},
        IdentificationState: {screen: IdentificationState},

        Declare: {screen: Declare},
        DeclareUserPreview: {screen: DeclareUserPreview},
        DeclareResult: {screen: DeclareResult},

        Registration: {screen: Registration},
        Settings: {screen: Settings},
    }, {
        contentComponent: Menu,
        drawerWidth: 300,
        drawerPosition: "left",
    });

    static navigationOptions = {
        header: false
    };
}
