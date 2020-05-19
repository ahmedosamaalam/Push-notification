import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

const SERVER_URL = environment.server_url;
// const SERVER_URL = 'http://localhost:300';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  constructor(private http: HttpClient) {}
  public sendSubscriptionToTheServer(url, subscription: PushSubscription) {
    return this.http.post(`${SERVER_URL}/${url}`, subscription);
  }

  sendSubscription(url, notificationPayload) {
    return this.http.post(`${SERVER_URL}/${url}`, notificationPayload);
  }
}
