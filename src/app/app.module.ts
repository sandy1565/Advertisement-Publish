import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './guards/auth-guard.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PersonFormComponent } from './PersonForm/add-person/add-person.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonListComponent  } from './PersonForm/person-list/person-list.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    SuperAdminDashboardComponent,
    AdminDashboardComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    SpinnerComponent,
    PersonFormComponent,
    PersonListComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    Nggx
  ],
  providers: [ AuthGuard, DatePipe, BsModalRef ],
  bootstrap: [AppComponent],
})
export class AppModule { }
