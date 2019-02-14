import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvtDetailsComponent } from './advt-details.component';

describe('AdvtDetailsComponent', () => {
  let component: AdvtDetailsComponent;
  let fixture: ComponentFixture<AdvtDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvtDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
