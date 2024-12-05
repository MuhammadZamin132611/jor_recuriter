import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEmailSmsComponent } from './send-email-sms.component';

describe('SendEmailSmsComponent', () => {
  let component: SendEmailSmsComponent;
  let fixture: ComponentFixture<SendEmailSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEmailSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendEmailSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
