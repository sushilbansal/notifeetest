import messaging from '@react-native-firebase/messaging';

export const SetNotificationToken = () => {
  const setNotiToken = async (deviceToken: string) => {
    // save token to DB
    // removed this code.
    console.log('+++++ deviceToken ++++++', deviceToken);
  };
  async function requestNotificationPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // get the device token on app load
      const token = await messaging().getToken();
      await setNotiToken(token);

      // Setup a listener so that if the token is refreshed while the
      // app is in memory we get the updated token.
      messaging().onTokenRefresh(async token => {
        await setNotiToken(token);
      });
    }
  }

  requestNotificationPermission();
};
