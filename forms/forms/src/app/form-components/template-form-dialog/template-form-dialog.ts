import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-template-form-dialog',
  imports: [MatDialogModule, FormsModule],
  templateUrl: './template-form-dialog.html',
  styleUrl: './template-form-dialog.scss'
})
export class TemplateFormDialog {
  numbers = {
    n1: 1,
    n2: 1,
    n3: 1,

  }
  numberOfElementsToDelete = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string }, public dialogRef: MatDialogRef<TemplateFormDialog>) { }

  closeDialog() {
    this.dialogRef.close(`N1: ${this.numbers.n1}, N2: ${this.numbers.n2}, N3: ${this.numbers.n3}`);
  }
}
