import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentsService } from '../../services/appointments.service';
import { AppointmentDialogueComponent } from '../appointment-dialogue/appointment-dialogue.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  currentDate: Date = new Date();
  hours: any[] = [];
  dragoverTime = '';
  dragId: number = 0;

  constructor(
    public appointmentsService: AppointmentsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getHours();
  }
  
  getHours(): void {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      let hour;
    
      // Format picked from google calednar
      if (i === 0) {
        hour = `GMT+00`;
      } else if (i < 12) {
        hour = `${i} AM`;
      } else if (i === 12) {
        hour = `${i} PM`;
      } else {
        hour = `${i - 12} PM`;
      }

      hours.push({ hour, appointment: this.appointmentsService.checkAppointment(hour, this.currentDate)?.[0] });
    }
    this.hours = hours;
  }

  get currentMonth(): string {
    return this.currentDate.toLocaleString('default', { month: 'long' });
  }

  get currentDay(): number {
    return this.currentDate.getDate();
  }

  get currentYear(): number {
    return this.currentDate.getFullYear();
  }

  goToPreviousDay(): void {
    const newDate = new Date(this.currentDate);
    newDate.setDate(this.currentDate.getDate() - 1);
    if (newDate.getDate() === 31) {
      newDate.setMonth(this.currentDate.getMonth() - 1);
      newDate.setDate(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate());
    }
    this.currentDate = newDate;
    this.getHours();
  }

  goToNextDay(): void {
    const newDate = new Date(this.currentDate);
    newDate.setDate(this.currentDate.getDate() + 1);
    if (newDate.getDate() === 1) {
      newDate.setMonth(this.currentDate.getMonth() + 1);
      newDate.setDate(1);
    }
    this.currentDate = newDate;
    this.getHours();
  }

  onMouseOver(time: string) {
    this.dragoverTime = time
  }

  addAppointment(hour: string): void {
    if (!this.appointmentsService.checkAppointment(hour, this.currentDate)?.[0]) {
      const dialogRef = this.dialog.open(AppointmentDialogueComponent, {
        width: '500px',
        autoFocus: false,
        data: { hour }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.appointmentsService.addAppointment({
            title: result.title,
            time: result.hour,
            date: this.currentDate,
            id: Number(new Date())
          })

          this.getHours();
        }
      });
    }
  }

  deleteAppointment(id: number): void {
    this.appointmentsService.deleteAppointment(id);
    this.getHours();
  }

  onDragStart(id: number) {
    this.dragId = id
  }

  onDragEnd(event: any) {
    if (!this.appointmentsService.checkAppointment(this.dragoverTime, this.currentDate)?.[0]) {
      this.appointmentsService.updateAppointment(this.dragoverTime, this.dragId)
    }
    this.getHours();
  }
}
