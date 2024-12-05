import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, toHTML, toDoc } from 'ngx-editor';
import { MessageService } from '../../Services/message.service';


@Component({
  selector: 'app-send-email-sms',
  templateUrl: './send-email-sms.component.html',
  styleUrls: ['./send-email-sms.component.scss']
})
export class SendEmailSmsComponent implements OnInit {
  editor!: Editor;
  @Input() email: string = '';
  @Input() number: number = 0;
  @Input() bulk: boolean = false;
  @Input() SMS: boolean = false;
  @Input() Candidates:Array<any>=[];
  @Output() childMessage = new EventEmitter<boolean>();
  @Output() CandidateList=new EventEmitter<object>();
  MessageForm!: FormGroup;
  submitted:boolean=false;
  constructor(private messageService:MessageService) { }
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],

  ];
  ngOnInit(): void {
    this.editor = new Editor();
    this.MessageForm = new FormGroup({
      email: new FormControl(this.email),
      number: new FormControl(this.number),
      message: new FormControl(),
      mailMessage: new FormControl()
    })

  }
  hello:any=''
  get f(): any { return this.MessageForm['controls'] }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  listOfFiles: Array<File> = [];
  filesize: number = 0;
  error: boolean = false;
  selectFile(e: any) {

    for (let file of e.target.files) {

      this.filesize = this.filesize + file.size;
      if (this.filesize <= 25000000) {
        this.error = false;
        this.listOfFiles.push(file)
        console.log(this.filesize)
      }
      if (this.filesize > 25000000) {
        this.error = true;
        this.filesize = this.filesize - file.size;
      }
    }
  }

  removeSelectedFiles(index: number) {
    this.filesize = this.filesize - this.listOfFiles[index].size;
    this.listOfFiles.splice(index, 1);

  }
  //Send mail for Single candidate
  sendMail() {
    const mailForm = new FormData();
    mailForm.set('recipients', this.MessageForm.value.email)
    mailForm.set('msgBody', toHTML(this.MessageForm.value.mailMessage))
    this.cancel();

    for (let file of this.listOfFiles) {
      mailForm.append('files', file)
    }

    mailForm.set('subject', 'Jobs for you from JOBCHECK')
    this.messageService.sendMail(mailForm).subscribe(res => {
      console.log(res)
      this.MessageForm.controls['mailMessage'].setValue(toDoc(''));
      // this.Show1 = !this.Show1;
      this.listOfFiles = []
      this.cancel();
    })
  }
  sendSmsToCandidates() {
    let smsForm = new FormData();
    const num = []
    num.push(this.MessageForm.value.number)
    smsForm.append('numbers', num[0])
    smsForm.set('message', this.MessageForm.value.message)
    this.cancel();

    this.messageService.sendSMS(smsForm).subscribe(res => {
      console.log(res);
      this.MessageForm.controls['message'].setValue('');
      this.cancel();
    })
  }
  removeCandidtaes(data:any){
    this.Candidates = this.Candidates.filter((s: any) => s != data);
    this.CandidateList.emit(data)
  }
  bulkmail() {
    this.submitted=true;
    if(this.MessageForm.invalid){
      return
    }
    else{
    // this.cancel();

    const mailForm = new FormData();

    let recipientsL = this.Candidates.map((s: any) => { return s.email }).join(',')

    mailForm.set('recipients', recipientsL)

    mailForm.set('msgBody', toHTML(this.MessageForm.value.mailMessage))
    for (let file of this.listOfFiles) {
      mailForm.append('files', file)
    }

    mailForm.set('subject', 'Jobs for you from JOBCHECK')
    this.messageService.sendMail(mailForm).subscribe(res => {
      console.log(res)
      this.MessageForm.controls['mailMessage'].setValue(toDoc(''));
    
    })
  }
    this.listOfFiles = []
    this.cancel();

  }
   //bulk sms
   bulkSms() {
    this.submitted=true;
    if(this.MessageForm.invalid){
      return
    }
    else{
    let smsForm = new FormData();
    const sms = this.Candidates.map((s: any) => {
      return s =  + s.mobileNumber
    }).join(',')
    // for (let user of this.reumlist) {

    smsForm.set('numbers', sms)
    smsForm.set('message', this.MessageForm.value.message)

    this.messageService.sendSMS(smsForm).subscribe(res => {
      console.log(res);
      // this.Show1 = !this.Show1;
    })
  }
    // 
    this.MessageForm.controls['message'].setValue('');
    this.cancel();




  }
  chooseMessage(e: any) {
    if (e.value== 'Email') {
      this.SMS = false;

    }
    if (e.value== 'SMS') {
      this.SMS = true;

    }
  }
  cancel() {
    this.childMessage.emit(false)
  }

}
