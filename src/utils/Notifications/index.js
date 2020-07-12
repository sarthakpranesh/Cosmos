import {Notifications} from 'react-native-notifications';

const startNotificationListening = () => {
  Notifications.registerRemoteNotifications();

  Notifications.events().registerNotificationReceivedForeground(
    (notification, completion) => {
      console.log(
        `Notification received in foreground: ${notification.title} : ${notification.body}`,
      );
      completion({alert: true, sound: true, badge: true});
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
  if ([undefined, null].includes(previousPosts) || previousPosts.length === 0) {
    return;
  }

  if (previousPosts.length < newPosts.length) {
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
