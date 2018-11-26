import { ResourceService } from './../../services/resource.service';
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

  constructor(
    private meetingRecordService: MeetingRecordService,
    private resourceService: ResourceService) {
  }

  ngOnInit() {
    const resource = this.resourceService.getCurrentResource();
    if (resource) {
      this.meetingRecordService.getMeetingRecords(resource.id).subscribe( response => {
        this.meetingRecords = response;
      });
    }
  }
}
