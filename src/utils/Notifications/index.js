import {Notifications} from 'react-native-notifications';
import auth from '@react-native-firebase/auth';

const startNotificationListening = () => {
  Notifications.registerRemoteNotifications();

  Notifications.events().registerNotificationReceivedForeground(
    (notification, completion) => {
      console.log(
        `Notification received in foreground: ${notification.title} : ${notification.body}`,
      );
      completion({alert: false, sound: false, badge: false});
    },
  );

  Notifications.events().registerNotificationOpened(
    (notification, completion) => {
      console.log(`Notification opened: ${notification.payload}`);
      completion();
    },
  );
};

export default startNotificationListening;

export const firebaseReactionNotify = (previousPosts, newPosts) => {
  const uid = auth().currentUser.uid;
  if ([undefined, null].includes(previousPosts) || previousPosts.length === 0) {
    return;
  }

  if (previousPosts.length < newPosts.length) {
    const p = newPosts.filter((a) => {
      return !previousPosts.find((b) => b.name === a.name);
    });
    if (p[0].uid === uid) {
      // do not show the author any notification
      return;
    }
    // tell user someone posted in the box
    // assuming only one new post
    return Notifications.postLocalNotification(
      {
        body: `${newPosts[0].createdBy} just posted an update, check it out now!`,
        title: 'New Post',
        sound: 'chime.aiff',
        category: 'NEW_POST',
        link: 'localNotificationLink',
        fireDate: new Date(),
      },
      24328.4234,
    );
  }
};
