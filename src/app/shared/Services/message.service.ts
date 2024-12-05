import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../Config/message.config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient,private message:Message) { }
  

  sendSMS(data:any){
    return this.http.post(environment.usermanagementService +this.message.Sms,data, { responseType: 'text' })
  }
  sendMail(Mail: FormData) {
    return this.http.post(environment.usermanagementService + this.message.Email, Mail, { responseType: 'text' })

  }
}
