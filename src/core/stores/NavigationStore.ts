import {action, computed, observable} from "mobx";
import {NavigationActions, NavigationNavigateAction, NavigationParams, NavigationState} from "react-navigation";
import {AppNavigator} from "../../AppNavigator";
import {persist} from "mobx-persist";
import {Keyboard, NavigationAction} from "react-native";
import * as _ from "lodash";

export class NavigationStore {
    @observable
    activeRoute: string;

    @observable
    menuId: string = "";

    @persist("object")
    @observable.ref
    navigationState: NavigationState = {
        index: 0,
        routes: [
            {key: "Login", routeName: "Login"},
        ],
    };

    @action("reducer dispatch navigation")
    dispatch = (action: NavigationNavigateAction, stackNavState = true): boolean => {
        if (action.routeName === "DrawerOpen") {
            Keyboard.dismiss();
        }

        const previousNavState = stackNavState ? this.navigationState : undefined;
        const newState = AppNavigator.router.getStateForAction(action, previousNavState);
        if (newState && newState !== previousNavState) {
            this.navigationState = newState;

            return true;
        }

        return false;
    };

    private _params?: { [key: string]: any };

    @computed
    get params(): { [key: string]: any } {
        return this._params || {};
    }

    @action("dispatch navigation")
    dispatchNavigation(routerAction: NavigationAction, reset: boolean = false): NavigationState | null {
        const previousNavState = reset ? null : this.navigationState;
        const newState = AppNavigator.router.getStateForAction(routerAction, previousNavState);
        if (newState && !_.isEqual(newState, previousNavState)) {
            this.navigationState = newState;

            return newState;
        }

        return null;
    }

    @action("reset navigation")
    reset(routeName: string, params?: NavigationParams, navAction?: NavigationNavigateAction): NavigationState | null {
        this.setActiveRoute(routeName);
        this._params = params;
        const resetAction = NavigationActions.navigate({routeName, params, action: navAction});
        const routerAction = NavigationActions.reset({index: 0, actions: [resetAction]});

        return this.dispatchNavigation(routerAction, true);
    }

    @action("go back")
    goBack(key?: string): NavigationState | null {
        return this.dispatchNavigation(NavigationActions.back({key}));
    }

    @action("navigate")
    navigate(routeName: string, params?: NavigationParams, action?: NavigationNavigateAction): void {
        this.setActiveRoute(routeName);
        this._params = params;

        this.dispatchNavigation(NavigationActions.navigate({routeName, params, action}));
    }

    @action("set params")
    setParams(params: NavigationParams): NavigationState | null {
        this._params = params;
        return this.dispatchNavigation(NavigationActions.setParams({params, key: this.navigationState.routes[0].key}));
    }

    drawerOpen() {
        Keyboard.dismiss();
        this.navigate("DrawerOpen");
    }

    drawerClose() {
        this.navigate("DrawerClose");
    }

    selectMenu(id: string) {
        this.menuId = id;
    }

    private setActiveRoute(routeName: string): void {
        switch (routeName) {
            case "DrawerOpen":
            case "DrawerClose":
                break;

            case "Main":
                this.activeRoute = "MyWallet";
                break;

            default:
                this.activeRoute = routeName;
                break;
        }
    }
}

export const navigationStore = new NavigationStore();
