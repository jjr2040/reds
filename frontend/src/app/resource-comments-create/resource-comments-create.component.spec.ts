import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCommentsCreateComponent } from './resource-comments-create.component';

describe('ResourceCommentsCreateComponent', () => {
  let component: ResourceCommentsCreateComponent;
  let fixture: ComponentFixture<ResourceCommentsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceCommentsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceCommentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
