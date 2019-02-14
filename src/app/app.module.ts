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
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxClickToEditModule } from 'ngx-click-to-edit';
import { ViewPublishComponent } from './advertisement-publish/view-publish/view-publish.component';
import { AdvertisePublishComponent } from './advertisement-publish/advertise-publish/advertise-publish.component';
import { AdvtDetailsComponent } from './advertisment-details/advt-details/advt-details.component';
import { AdvtDetailsListComponent } from './advertisment-details/advt-details-list/advt-details-list.component';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

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
    PersonListComponent,
    ViewPublishComponent,
    AdvertisePublishComponent,
    AdvtDetailsListComponent,
    AdvtDetailsComponent,
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
    NgxUiLoaderModule
  ],
  providers: [ AuthGuard, DatePipe, BsModalRef ],
  bootstrap: [AppComponent],
})
export class AppModule { }
