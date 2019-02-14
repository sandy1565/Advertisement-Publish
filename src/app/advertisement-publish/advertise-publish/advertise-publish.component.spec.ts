import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisePublishComponent } from './advertise-publish.component';

describe('AdvertisePublishComponent', () => {
  let component: AdvertisePublishComponent;
  let fixture: ComponentFixture<AdvertisePublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertisePublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisePublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
