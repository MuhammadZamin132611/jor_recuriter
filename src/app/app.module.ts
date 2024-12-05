import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp } from "firebase/app"
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChangePasswordComponent } from './authentication/Components/change-password/change-password.component';
import { NgOtpInputModule } from  'ng-otp-input';


initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule,
    MatTooltipModule,
    PdfViewerModule,
    NgOtpInputModule
  ],


  bootstrap: [AppComponent]
})
export class AppModule { }
