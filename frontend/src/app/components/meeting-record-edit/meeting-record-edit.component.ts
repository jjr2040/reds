import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingRecord } from '../../models/meetingRecord';
import { MeetingRecordService } from '../../services/meetingRecord.service';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-meeting-record-edit',
  templateUrl: './meeting-record-edit.component.html',
  styleUrls: ['./meeting-record-edit.component.css']
})
export class MeetingRecordEditComponent implements OnInit {
  recordForm: FormGroup = this.fb.group({
    title: [''],
    body: [''],
    resource: ['']
  });

  record: MeetingRecord;
  resources;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private meetingRecordService: MeetingRecordService,
    private router: Router, private resourceService: ResourceService) { }

  ngOnInit() {
    this.getResources();
    if (!this.isNew) {
    }
  }

  get isNew(): boolean {
    return !this.route.snapshot.paramMap.has('id');
  }

  get actionName(): string {
    return this.isNew ? 'Crear' : 'Editar';
  }

  saveRecord() {
    const record: MeetingRecord = this.recordForm.value;
    if (this.isNew) {
      this.meetingRecordService.createMeetingRecord(record).subscribe( updatedRecord => {
        console.log('activity record');
        this.router.navigate(['/meetingRecords']);
      });
    } else {
      record.id = this.record.id;
      this.meetingRecordService.updateMeetingRecord(record).subscribe( updatedActivity => {
        console.log('updated record');
        this.router.navigate(['/meetingRecords']);
      });
    }
  }

  getResources() {
    this.resourceService.getResources().subscribe( resources => this.resources = resources);
  }
}
