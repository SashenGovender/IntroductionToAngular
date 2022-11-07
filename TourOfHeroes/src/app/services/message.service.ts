import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Array<string> = []

  constructor() { }

  public add(message: string) {
    this.messages.push(message);
  }

  public clear(): void {
    this.messages = [];
  }
}
