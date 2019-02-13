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

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'super-admin-dashboard', component: SuperAdminDashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'add-person', component: PersonFormComponent },
      { path: 'person-list', component: PersonListComponent }
    ]
  },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
