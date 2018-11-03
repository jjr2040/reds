import { Component, OnInit } from '@angular/core';
import { MeetingRecordService } from '../../services/meetingRecord.service';
import { MeetingRecord } from '../../models/meetingRecord';

@Component({
  selector: 'app-meeting-record',
  templateUrl: './meeting-record.component.html',
  styleUrls: ['./meeting-record.component.css']
})
export class MeetingRecordComponent implements OnInit {

  meetingRecords: MeetingRecord[];

  constructor(private meetingRecordService: MeetingRecordService) {
    this.meetingRecordService.getMeetingRecords().subscribe( response => {
      this.meetingRecords = response;
    });
  }

  ngOnInit() {
  }
}
