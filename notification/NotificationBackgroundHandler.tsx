import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';

import notifee, { Notification } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export const NotificationBackgroundHandler = () => {
  const getChannelId = async (type: string) => {
    let channelId = await notifee.createChannel({
      id: type,
      name: type,
      vibration: true,
      sound: 'default',
    });
    if (channelId === '') {
      channelId = 'default';
    }
    return channelId;
  };

  const sendNotification = async (data: any) => {
    const {body, jobId, title, type} = data;
    const channelId = await getChannelId(type);
    const options: Notification = {
      title,
      body,
      data: {
        jobId,
      },
      android: {
        channelId,
        pressAction: {
          id: channelId,
          launchActivity: 'default',
        },
        sound: 'default',
      },
      ios: {
        sound: 'default',
      },
    };
    await notifee.displayNotification(options);
  };

  // It will execute whenever app is in background and admin send a new chat message
  const onMessageReceived = async (message: any) => {
    console.log(' ----- ---- onMessageReceived -----', message);
    let data;
    if (Platform.OS === 'android') {
      data = {
        ...message.data,
        title: message.title,
        body: message.body,
      };
    } else {
      data = {
        ...message.data.notifee_options.data,
        title: message.data.notifee_options.title,
        body: message.data.notifee_options.body,
      };
    }

    await sendNotification({
      ...data,
    });
  };

  messaging().setBackgroundMessageHandler(onMessageReceived);
};
