import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceUsersComponent } from './resource-users.component';

describe('ResourceUsersComponent', () => {
  let component: ResourceUsersComponent;
  let fixture: ComponentFixture<ResourceUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
