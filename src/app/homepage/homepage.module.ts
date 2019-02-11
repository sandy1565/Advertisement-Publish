import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HomePageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';

@NgModule({
    imports: [
        CommonModule,
        // TranslateModule,
        HomePageRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpModule
    ],
    declarations: [],
})
export class HomePageModule {}
