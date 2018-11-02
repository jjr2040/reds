import { Injectable } from '@angular/core';

const activities = [
    {
      id: 1,
  name: 'Actividad 1',
  startDate: '2018-10-31',
  endDate: '2018-10-31',
  periodicity: 1,
  duration: 5,
  status: 1
    },
    {
      id: 2,
  name: 'Actividad 2',
  startDate: '2018-10-31',
  endDate: '2018-10-31',
  periodicity: 1,
  duration: 5,
  status: 1
    }
  ];

@Injectable({
  providedIn: 'root'
})
export class WorkActivityService {
  private activities;

  constructor() {
    this.activities = activities;
  }

  getActivities() {
    return this.activities;
  }
}
