import React, { useEffect } from 'react';
import { View } from 'react-native';

import messaging from '@react-native-firebase/messaging';

export const NotificationSubscription = () => {

  let unsubscribe: any;
  
  useEffect(() => {
    // It will run when app is in foreground.
    // We need to make sure that count of messages go up but not the notifications.
    // Check whether an initial notification is available
    // Notification caused app to open from quit state
    messaging()
      .getInitialNotification()
      .then((message) => {
        console.log("((((( getInitialNotification ))))", message)
      });

    unsubscribe = messaging().onMessage((message) => {
      console.log("******* onMessage *******", message)


    });

    return unsubscribe;
  }, []);

  return <View />;
};
