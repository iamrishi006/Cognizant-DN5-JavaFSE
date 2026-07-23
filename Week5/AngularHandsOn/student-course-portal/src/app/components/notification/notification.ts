import { Component } from '@angular/core';
/*
Providing NotificationService here creates a new instance
for this component and its child components only.

This demonstrates component-level dependency injection.
Each NotificationComponent has its own isolated service instance.
*/
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.css',

  providers: [
    NotificationService
  ]

})
export class Notification {

  constructor(
    public notificationService: NotificationService
  ) {}

}