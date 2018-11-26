import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCommentsListComponent } from './resource-comments-list.component';

describe('ResourceCommentsListComponent', () => {
  let component: ResourceCommentsListComponent;
  let fixture: ComponentFixture<ResourceCommentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceCommentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceCommentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
