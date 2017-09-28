/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "ConfigProvider.h"
#import <React/RCTPushNotificationManager.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;


  if ([ConfigProvider isAvailable]) {
      jsCodeLocation = [RCTBundleURLProvider jsBundleURLForBundleRoot:@"index.ios" packagerHost:[ConfigProvider testIp] enableDev:YES enableMinification:NO];
  } else {
      jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  }
  NSLog(@"jsCodeLocation: %@", jsCodeLocation);
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"datachan"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  /////////////////////////////////////////////////////
  UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeSound |
                                          UIUserNotificationTypeAlert | UIUserNotificationTypeBadge categories:nil];
  
  [[UIApplication sharedApplication] registerUserNotificationSettings:settings];
  [[UIApplication sharedApplication] registerForRemoteNotifications];
  //////////////////////////////////////////////////////////////////

  
  return YES;
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *) deviceToken {
  SBNotificationHub* hub = [[SBNotificationHub alloc] initWithConnectionString:HUBLISTENACCESS
                                                           notificationHubPath:HUBNAME];
  
  [hub registerNativeWithDeviceToken:deviceToken tags:nil completion:^(NSError* error) {
    if (error != nil) {
//      [self MessageBox:@"Registration Status" message: error];
      NSLog(@"Error registering for notifications: %@", error);
    } else {
//      [self MessageBox:@"Registration Status" message:@"Registered"];
      [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
    }
  
  }];
}
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.

// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
//  [self MessageBox:@"Notification" message:[[userInfo objectForKey:@"aps"] valueForKey:@"alert"]];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [RCTPushNotificationManager didReceiveLocalNotification:notification];
}
-(void)MessageBox:(NSString *)title message:(NSString *)messageText
{
  UIAlertView *alert = [[UIAlertView alloc] initWithTitle:title message:messageText delegate:self
                                        cancelButtonTitle:@"OK" otherButtonTitles: nil];
  [alert show];
}

@end
