import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [CommonModule, LoginRoutingModule, ReactiveFormsModule, FormsModule, HttpModule, BrowserAnimationsModule],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule {}
