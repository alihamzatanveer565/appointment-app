import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment-dialogue',
  templateUrl: './appointment-dialogue.component.html',
  styleUrls: ['./appointment-dialogue.component.css']
})
export class AppointmentDialogueComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AppointmentDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hour: string }
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close({title: this.form.value.title, hour: this.data.hour});
    }
  }
}
