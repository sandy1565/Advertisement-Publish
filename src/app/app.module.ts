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
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PersonFormComponent } from './PersonForm/add-person/add-person.component';
import { HttpClientModule } from '@angular/common/http';
import { PersonListComponent  } from './PersonForm/person-list/person-list.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxClickToEditModule } from 'ngx-click-to-edit';
import { ViewPublishComponent } from './advertisement-publish/view-publish/view-publish.component';
import { AdvertisePublishComponent } from './advertisement-publish/advertise-publish/advertise-publish.component';
import { AdvtDetailsComponent } from './advertisment-details/advt-details/advt-details.component';
import { AdvtDetailsListComponent } from './advertisment-details/advt-details-list/advt-details-list.component';
import { SearchAdvtDetailsPipe } from './advertisment-details/advt-details-list/search-advt-details.pipe';
import { AddClientComponent } from './client-details/add-client/add-client.component';
import { ClientListComponent } from './client-details/client-list/client-list.component';
import { PasswordInputComponent } from '../app/login/password-input';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientAdvtListComponent } from './client-dashboard/advt-list/advt-list.component';
import { SearchlistPipe } from './PersonForm/person-list/searchlist.pipe';
import { TogglerDirective } from './toggler.directive';
import { RecordRtcComponent } from './record-rtc/record-rtc.component';
import { AudioRecordingService } from './record-rtc/record-rtc.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgHttpLoaderModule } from 'ng-http-loader'; 

@NgModule({
  declarations: [
    PasswordInputComponent,
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
    PersonListComponent,
    ViewPublishComponent,
    AdvertisePublishComponent,
    AdvtDetailsListComponent,
    AdvtDetailsComponent,
    SearchAdvtDetailsPipe,
    AdminSidebarComponent,
    UserSidebarComponent,
    AddClientComponent,
    ClientListComponent,
    ClientDashboardComponent,
    ClientAdvtListComponent,
    SearchlistPipe,
    TogglerDirective,
    RecordRtcComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    NgxClickToEditModule,
    NgSelectModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [ AuthGuard, DatePipe, BsModalRef, AudioRecordingService ],
  bootstrap: [AppComponent],
})
export class AppModule { }
