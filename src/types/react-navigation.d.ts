declare interface INavigationProps {
    navigation?: {
        navigate: (routeName: string) => boolean;
        goBack: () => void;
        replace: (routeName: string) => boolean;
        dispatch: (a: any) => void;
        state: {
            key: string;
            params?: { [index: string]: any };
            routeName: string;
        }
    };
}

declare interface INavigatorScreenOptions {
    header?: boolean;
}
