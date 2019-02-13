import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PersonFormComponent } from './add-person.component';
import { PersonFormRoutingModule } from './person-form-routing.module';
@NgModule({
    imports: [
        CommonModule,
        PersonFormRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [PersonFormComponent]
})
export class PersonFormModule {}
