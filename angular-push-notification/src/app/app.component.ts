import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment.prod';
import { PushNotificationService } from './services/push-notification.service';

const VAPID_PUBLIC =
  'BPTAMQXW2VfikrkGYBK79kbwefRaLPI80qruM48C8118-_rcmavi0Nt3MXrKaxV0F7lhJkdAZQuN97I0yuYzwx4';
// 'BGIYpBjwj0_9fsc8TRDwpoV6PDUgl-NoX1uubkVYCasZvPzHssLEDdHW3_zhHAW9pQXTMSZrUk1ynVXgMkt8GFM';
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
    // console.log('123');
    // if (this.swPush.isEnabled) {
    //   this.swPush
    //     .requestSubscription({
    //       serverPublicKey:
    //         'BKO8KCPAONxPNJZj4vB3XwBn-sh0-RVzbazTcQNcBIO2bVpnM1AMIx5Vkj3zmwcD81-d9iRthWbdsyaaVK9k6C4',
    //     })
    //     .then((subscription) => {
    //       this.pushService
    //         .sendSubscriptionToTheServer('subscription', subscription)
    //         .subscribe((res) => {
    //           console.log(res);
    //         });
    //     })
    //     .catch(console.error);
    // }
  }

  sendNotification() {
    const payload = {
      notification: {
        title: 'StoryBook',
        body: 'welcome friends',
        url: 'http://localhost:8080',
        ttl: 36000,
        icon:
          'https://cdn3.iconfinder.com/data/icons/happy-x-mas/501/santa15-128.png',
        badge:
          'https://cdn3.iconfinder.com/data/icons/happy-x-mas/501/santa15-128.png',
        data: 'Hello New World',
      },
    };
    this.pushService
      .sendSubscription('sendNotification', payload)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
