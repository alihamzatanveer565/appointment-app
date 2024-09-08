import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private appointments: Appointment[] = [
    {
      time: '1 AM',
      title: 'Test appointment 1',
      date: new Date(),
      id: Number(new Date())
    }
  ];

  constructor() { }

  checkAppointment(time: string, currentDate: Date) {
    return this.appointments.filter(a => 
      (new Date(a.date)?.toDateString() === currentDate?.toDateString() && a?.time?.toString() === time?.toString())
    );
  }

  addAppointment(appointment: Appointment): void {
    this.appointments.push(appointment);
  }

  updateAppointment(time: string, id: number) {
    const index = this.appointments.findIndex(a => a.id === id);
    this.appointments[index].time = time
  }

  deleteAppointment(id: number) {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appointments.splice(index, 1);
    }
  }
}
