import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth-guard.service';
import { PersonFormComponent } from './PersonForm/add-person/add-person.component';
import { PersonListComponent } from './PersonForm/person-list/person-list.component';
import { AdvertisePublishComponent } from './advertisement-publish/advertise-publish/advertise-publish.component';
import { ViewPublishComponent } from './advertisement-publish/view-publish/view-publish.component';
import { AdvtDetailsComponent } from './advertisment-details/advt-details/advt-details.component';
import { AdvtDetailsListComponent } from './advertisment-details/advt-details-list/advt-details-list.component';
import { AddClientComponent } from './client-details/add-client/add-client.component';
import { ClientListComponent } from './client-details/client-list/client-list.component';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientAdvtListComponent } from './client-dashboard/advt-list/advt-list.component';
 
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'super-admin-dashboard', component: SuperAdminDashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'super-admin-dashboard', pathMatch: 'full' },
      { path: 'add-person', component: PersonFormComponent },
      { path: 'edit-person-details/:id', component: PersonFormComponent },
      { path: 'person-list', component: PersonListComponent },
      { path: 'advertise-publish', component: AdvertisePublishComponent },
      { path: 'view-publish', component: ViewPublishComponent },
      { path: 'advt-details', component: AdvtDetailsComponent },
      { path: 'edit-details/:id', component: AdvtDetailsComponent },
      { path: 'view-details/:id', component: AdvtDetailsComponent },
      { path: 'advt-details-list', component: AdvtDetailsListComponent },
      { path: 'add-client', component: AddClientComponent },
      { path: 'edit-client/:id', component: AddClientComponent },
      { path: 'client-list', component: ClientListComponent }
    ]
  },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard],
    children: [
    { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
    { path: 'add-person', component: PersonFormComponent },
    { path: 'person-list', component: PersonListComponent },
    { path: 'advertise-publish', component: AdvertisePublishComponent },
    { path: 'view-publish', component: ViewPublishComponent },
    { path: 'advt-details', component: AdvtDetailsComponent },
    { path: 'advt-details-list', component: AdvtDetailsListComponent }
  ]
 },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'add-person', component: PersonFormComponent },
    { path: 'person-list', component: PersonListComponent },
    { path: 'advertise-publish', component: AdvertisePublishComponent},
    { path: 'view-publish', component: ViewPublishComponent},
    { path: 'advt-details', component: AdvtDetailsComponent},
    { path: 'advt-details-list', component: AdvtDetailsListComponent}
  ] },
  {
    path:'client-dashboard', component:ClientDashboardComponent, canActivate:[AuthGuard],
    children:[
     { path:'',component:ClientAdvtListComponent},
     { path: 'view-details/:id', component: AdvtDetailsComponent },
     { path:'advt-details-list', component:ClientAdvtListComponent},
     { path: 'profile/:id', component: AddClientComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
