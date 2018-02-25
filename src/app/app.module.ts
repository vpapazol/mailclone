import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoxService } from './box.service';
import { MailService } from './mail.service';
import { StoreService } from './store.service';
import { ContactService } from './contact.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { MailboxesComponent } from './user/mailboxes/mailboxes.component';
import { SingleboxComponent } from './user/mailboxes/singlebox/singlebox.component';
import { MaillistComponent } from './user/maillist/maillist.component';
import { SinglemailComponent } from './user/maillist/singlemail/singlemail.component';
import { BodyComponent } from './user/body/body.component';
import { AddressesComponent } from './user/addresses/addresses.component';
import { AddboxComponent } from './user/mailboxes/addbox/addbox.component';
import { AddcontactComponent } from './user/addresses/addcontact/addcontact.component';
import { SinglecontactComponent } from './user/addresses/singlecontact/singlecontact.component';
import { ContactComponent } from './user/contact/contact.component';
import { AddmailComponent } from './user/maillist/addmail/addmail.component';

const routes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'user', canActivate: [ AuthGuard ], component: UserComponent,
        children: [
          {path: 'boxes', component: MailboxesComponent, outlet: 'boxes'},
          {path: 'addresses', component: AddressesComponent, outlet: 'addresses'},
          {path: 'mails', component: MaillistComponent, outlet: 'letters'},
          {path: 'body', component: BodyComponent, outlet: 'body'},
          {path: 'addr', component: ContactComponent, outlet: 'addr'},
          {path: 'mail', component: AddmailComponent, outlet: 'mail'}
        ]
    }
  ];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    MailboxesComponent,
    SingleboxComponent,
    MaillistComponent,
    SinglemailComponent,
    BodyComponent,
    AddressesComponent,
    AddboxComponent,
    AddcontactComponent,
    SinglecontactComponent,
    ContactComponent,
    AddmailComponent,
    AddmailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot( routes )
  ],
  providers: [
      FormBuilder,
      AuthService,
      AuthGuard,
      BoxService,
      MailService,
      StoreService,
      ContactService,
      UserComponent,
      MaillistComponent,
      SinglemailComponent,
      BodyComponent,
      AddressesComponent,
      ContactComponent,
      AddmailComponent
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
