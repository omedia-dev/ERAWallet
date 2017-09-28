import React, {Component} from "react";
import {FlatList, ImageURISource, View} from "react-native";
import {styles} from "../styles";
import {ImageResources} from "../common/ImageRecources.g";
import {DrawerMenuItem} from "../common/DrawerMenuItem";
import {stores} from "../core/stores/Stores";
import {f} from "../common/t";
import {observer} from "mobx-react";
import {MenuHeader} from "../common/MenuHeader";

@observer
export class Menu extends Component<IMenuProps, IMenuState> {
    static navigationOptions: INavigatorScreenOptions = {
        header: false
    };
    state: IMenuState;
    menuItems: IMenuItemData [] =[];
    private renderItem = ({item}: { item: IMenuItemData }) => {
        return (
            <DrawerMenuItem
                onPress={this.onDrawerPress(item)}
                id={item.id}
                route={item.route}
                icon={item.icon}
                title={item.title}
            />
        );
    };
    private keyExtractor = (item: IMenuItemData) => {
        return item.id;
    };
    private onDrawerPress = (item: IMenuItemData) => {
        return () => {
            stores.navigationStore.selectMenu(item.id);
            stores.navigationStore.navigate(item.route);
        };
    };


    render(): JSX.Element {
        const footer = this.footer();
        this.menuItems = this.getMenu();
        const menuItems = this.filterMenu();

        return (
            <View style={styles.menu.container}>
                <View style={styles.menu.itemsContainer}>
                    <FlatList
                        bounces={false}
                        ListHeaderComponent={MenuHeader}
                        data={menuItems}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                    />
                </View>
                {footer}
            </View>
        );
    }

    private footer(): JSX.Element {
        return (
            <View style={styles.menu.settingsContainer}>
                <View style={styles.menu.line}/>
                <DrawerMenuItem
                    onPress={this.onDrawerPress({
                        id: "Settings",
                        route: "Settings",
                        title: "",
                        icon: ImageResources.icon_settings
                    })}
                    id={"Settings"}
                    route={"Settings"}
                    icon={ImageResources.icon_settings}
                    title={f`Settings`}
                />
            </View>);
    }

    private filterMenu() {
              return this.menuItems.filter(m => m.isAuthorized === undefined || m.isAuthorized === (stores.accountStore.profile && stores.accountStore.profile.isAuthorized));
    }
    private getMenu(): IMenuItemData[] {
        return [
            {
                id: "MyWallet",
                route: "MyWallet",
                icon: ImageResources.icon_wallet,
                title: f`Wallet`
            },
            {
                id: "Persons",
                route: "PersonsLocal",
                icon: ImageResources.icon_contact_menu,
                title: f`Favorite Persons`
            },
            {
                id: "Assets",
                route: "AssetsLocal",
                icon: ImageResources.icon_wallet_money,
                title: f`Favorite Actives`,
            },
            {
                id: "Registration",
                route: "Registration",
                icon: ImageResources.icon_registration,
                title: f`Register`,
                isAuthorized: false,
            }, {
            id: "WorkWithPersons",
            route: "",
            icon: ImageResources.icon_user_menu,
            title: f`WorkWithPersons`,
            isAuthorized: true,
        },
            {
                id: "WorkWithPersons.RegisterPerson",
                route: "Identification",
                icon: ImageResources.icon_registration,
                title: f`Register`,
                isAuthorized: true,
            },
            {
                id: "WorkWithPersons.ConfirmPerson",
                route: "Declare",
                icon: ImageResources.icon_renewal,
                title: f`Declare`,
                isAuthorized: true,
            }
        ];
    }
}

interface IMenuProps extends INavigationProps {
}

interface IMenuState {
    selectedId: string;
}

interface IMenuItemData {
    icon: ImageURISource;
    title: string;
    id: string;
    route: string;
    isAuthorized?: boolean,
}

