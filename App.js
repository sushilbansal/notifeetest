/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';

import {AppFake} from './AppFake';
import {NotificationBackgroundHandler} from './notification/NotificationBackgroundHandler';
import {NotificationSubscription} from './notification/NotificationSubscription';
import {SetNotificationToken} from './notification/SetNotificationToken';

export default function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return <AppFake />;
  }
  return <App />;
}

const App = () => {
  useEffect(() => {
    const unsubscribeNotification = notifee.onForegroundEvent(
      ({type, detail}) => {
        const {notification} = detail;
        switch (type) {
          case EventType.DISMISSED:
            console.log('User dismissed notification', notification);
            break;
          case EventType.PRESS:
            if (type === EventType.PRESS && notification) {
              console.log('===== pressed foreground event =====', notification);
            }
            break;
        }
      },
    );
    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification} = detail;
      if (type === EventType.PRESS && notification) {
        console.log('===== pressed backgroundevent=====', notification);
      }
    });
    return () => {
      unsubscribeNotification();
    };
  }, []);

  return (
    <>
      <SetNotificationToken />
      <NotificationBackgroundHandler />
      <NotificationSubscription />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={{margin: 100}}>
            <Text>Hello</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
