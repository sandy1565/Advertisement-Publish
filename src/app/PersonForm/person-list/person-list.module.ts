import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonListRoutingModule } from './person-list-routing.module';
import { SearchlistPipe } from './searchlist.pipe';
import { PersonListComponent } from './person-list.component';

@NgModule({
    imports: [
        CommonModule,
        PersonListRoutingModule],
    declarations: [
        PersonListComponent,
        SearchlistPipe
    ]
})
export class PersonListModule {}
