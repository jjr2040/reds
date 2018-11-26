import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorHandlingService } from './error-handling.service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MeetingRecord } from '../models/meetingRecord';

@Injectable({
  providedIn: 'root'
})
export class MeetingRecordService {

  private apiUrl = `${environment.apiUrl}/meeting-records/`;

  constructor(private http: HttpClient,
    private errorHandlingService: ErrorHandlingService) { }

  getMeetingRecords(resourceId: Number): Observable<MeetingRecord[]> {
    const url = this.apiUrl + `?resource=${resourceId}`;
    return this.http.get<MeetingRecord[]>(url).pipe(
      catchError(this.errorHandlingService.handleError<MeetingRecord[]>('Error getting MeetingRecord'))
    );
  }

  getMeetingRecord(id: Number): Observable<MeetingRecord> {
    const url = this.apiUrl + `${id}/`;
    return this.http.get<MeetingRecord>(url).pipe(
      catchError(this.errorHandlingService.handleError<MeetingRecord>('Error fetching an MeetingRecord'))
    );
  }

  createMeetingRecord(meetingRecord: MeetingRecord): Observable<MeetingRecord> {
    return this.http.post<MeetingRecord>(this.apiUrl, meetingRecord).pipe(
      catchError(this.errorHandlingService.handleError<MeetingRecord>('Error adding an MeetingRecord'))
    );
  }

  updateMeetingRecord(meetingRecord: MeetingRecord): Observable<MeetingRecord> {
    const url = this.apiUrl + `${meetingRecord.id}/`;
    return this.http.put<MeetingRecord>(url, meetingRecord).pipe(
      catchError(this.errorHandlingService.handleError<MeetingRecord>('Error updating an MeetingRecord'))
    );
  }

  deleteMeetingRecord(meetingRecord: MeetingRecord): Observable<MeetingRecord> {
    const url = this.apiUrl + `${meetingRecord.id}/`;
    return this.http.delete<MeetingRecord>(url).pipe(
      catchError(this.errorHandlingService.handleError<MeetingRecord>('Error deleting an MeetingRecord'))
    );
  }
}
