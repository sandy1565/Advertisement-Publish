import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonListRoutingModule } from './person-list-routing.module';
import { SearchlistPipe } from './searchlist.pipe';
import { PersonListComponent } from './person-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        PersonListRoutingModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        SearchlistPipe
    ]
})
export class PersonListModule {}
