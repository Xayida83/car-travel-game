import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { CompletedLine } from '../../core/models/completed-line.model';

export type CompletedLineDialogAction =
  | 'continue'
  | 'new-16'
  | 'new-32';

export type CompletedLineDialogData = {
  line: CompletedLine;
};

@Component({
  selector: 'app-completed-line-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './completed-line-dialog.component.html',
  styleUrl: './completed-line-dialog.component.scss',
})
export class CompletedLineDialogComponent {
  private readonly dialogRef =
    inject(MatDialogRef<CompletedLineDialogComponent>);

  readonly data = inject<CompletedLineDialogData>(MAT_DIALOG_DATA);

  get directionText(): string {
    return this.data.line.direction === 'row' ? 'vågrätt' : 'lodrätt';
  }

  close(action: CompletedLineDialogAction): void {
    this.dialogRef.close(action);
  }
}