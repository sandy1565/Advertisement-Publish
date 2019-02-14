import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvtDetailsListComponent } from './advt-details-list.component';

describe('AdvtDetailsListComponent', () => {
  let component: AdvtDetailsListComponent;
  let fixture: ComponentFixture<AdvtDetailsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvtDetailsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvtDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
