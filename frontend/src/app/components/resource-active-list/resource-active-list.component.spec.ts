import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceActiveListComponent } from './resource-active-list.component';

describe('ResourceActiveListComponent', () => {
  let component: ResourceActiveListComponent;
  let fixture: ComponentFixture<ResourceActiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceActiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceActiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
