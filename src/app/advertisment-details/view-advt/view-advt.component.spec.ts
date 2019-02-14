import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdvtComponent } from './view-advt.component';

describe('ViewAdvtComponent', () => {
  let component: ViewAdvtComponent;
  let fixture: ComponentFixture<ViewAdvtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAdvtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
