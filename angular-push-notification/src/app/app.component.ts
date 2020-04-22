import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment.prod';
import { PushNotificationService } from './services/push-notification.service';

const VAPID_PUBLIC =
  'BGIYpBjwj0_9fsc8TRDwpoV6PDUgl-NoX1uubkVYCasZvPzHssLEDdHW3_zhHAW9pQXTMSZrUk1ynVXgMkt8GFM';
// const VAPID_PUBLIC = environment.publicKey;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-push-notifications';

  constructor(
    private swPush: SwPush,
    private pushService: PushNotificationService
  ) {}

  ngOnInit() {
    if (this.swPush.isEnabled) {
      this.swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then((subscription) => {
          this.pushService
            .sendSubscriptionToTheServer('subscription', subscription)
            .subscribe((res) => {
              console.log(res);
            });
        })
        .catch(console.error);
    }
  }

  sendNotification() {
    const payload = {
      notification: {
        title: 'Angular Notification',
        body: 'This is the body of the notification',
        icon: 'assets/icons/icon-512x512.png',
      },
    };
    this.pushService
      .sendSubscription('sendNotification', payload)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
