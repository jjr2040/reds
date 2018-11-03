import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRecordComponent } from './meeting-record.component';

describe('MeetingRecordComponent', () => {
  let component: MeetingRecordComponent;
  let fixture: ComponentFixture<MeetingRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
