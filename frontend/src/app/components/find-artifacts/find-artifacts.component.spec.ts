import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindArtifactsComponent } from './find-artifacts.component';

describe('FindArtifactsComponent', () => {
  let component: FindArtifactsComponent;
  let fixture: ComponentFixture<FindArtifactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindArtifactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindArtifactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
