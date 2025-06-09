import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { TemplateFormDialog } from './form-components/template-form-dialog/template-form-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIcon, TemplateFormDialog],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'forms';

  constructor(private matDialog: MatDialog) {}

  public openDialog(): void {
    console.log('Should Open dialog');
    this.matDialog.open(TemplateFormDialog).afterClosed().subscribe( r => {
      console.log(`Result: ${r}`);
    })
  }
}
