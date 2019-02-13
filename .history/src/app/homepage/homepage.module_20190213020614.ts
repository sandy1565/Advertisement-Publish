import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { HomePageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';

@NgModule({
    imports: [
        CommonModule,
        HomePageRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule
    ],
    declarations: [HomepageComponent],
})
export class HomePageModule {}
