var PushNotification = require('react-native-push-notification');
const NotificationHub = require('react-native-azurenotificationhub');

const connectionString = 'Endpoint=sb://release.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=WMZQq8mtzEZxn72uyi7NfFDrCFEPrpQyN2rrMLPRBhw='; // The Notification Hub connection string
const hubName = 'erachain';
const senderID = '258290896385';
const tags: string[] = [];

export class PushNotificationManager {
    id: number[] = [];
    constructor() {
        PushNotification.configure({
            onRegister: function (token: string) {
                console.log('TOKEN:', token);
            },
            onNotification: function (notification: any) {
                if(!this.id){
                    this.id = [];
                    PushNotification.cancelAllLocalNotifications();
                    return;
                }
                this.id = [...[],...this.id];
                if(this.id.indexOf(notification.id) === -1) {
                    PushNotification.localNotification({
                        id: notification.id,
                        title: "Erachain",
                        message: notification.message,
                        largeIcon: "ic_launcher",
                        smallIcon: "ic_notification",
                    });
                    this.id = [...this.id,notification.id];
                }
                else {
                    this.id = this.id.splice(this.id.indexOf(notification.id)- 1,1);
                    PushNotification.cancelLocalNotifications({id: notification.id});
                }

            },

            smallIcon: "ic_notification",
            senderID: "258290896385",
            permissions: {alert: true, badge: true, sound: true},

            default: true,
            popInitialNotification: true,
            requestPermissions: true,
        });
    }


    register(): void {
        NotificationHub.register({connectionString, hubName, senderID, tags});
    }

    unregister(): void {
        NotificationHub.unregister();
    }


}
