import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRecordEditComponent } from './meeting-record-edit.component';

describe('MeetingRecordEditComponent', () => {
  let component: MeetingRecordEditComponent;
  let fixture: ComponentFixture<MeetingRecordEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingRecordEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingRecordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
