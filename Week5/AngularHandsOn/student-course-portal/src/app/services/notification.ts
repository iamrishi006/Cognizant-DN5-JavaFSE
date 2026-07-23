import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  message = '';

  setMessage(message: string) {

    this.message = message;

  }

  getMessage() {

    return this.message;

  }

}