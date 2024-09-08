import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentDialogueComponent } from './appointment-dialogue/appointment-dialogue.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { MaterialModule } from '../material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CalendarComponent,
    AppointmentDialogueComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    MaterialModule,
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class AppointmentsModule { }
