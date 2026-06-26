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

export type CompletedLineDialogMode = 'completed-line' | 'all-found';

export type CompletedLineDialogData = {
  mode: CompletedLineDialogMode;
  line?: CompletedLine;
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

   get isAllFound(): boolean {
    return this.data.mode === 'all-found';
  }

    get title(): string {
    return this.isAllFound ? 'Alla föremål hittade!' : 'Fyra i rad!';
  }

  get message(): string {
    if (this.isAllFound) {
      return 'Grattis, du hittade alla föremål.';
    }

    const directionText =
      this.data.line?.direction === 'row' ? 'vågrätt' : 'lodrätt';

    return `Grattis, du fick fyra i rad ${directionText}.`;
  }

  get primaryButtonText(): string {
    return this.isAllFound ? 'Stäng' : 'Spela vidare';
  }

  close(action: CompletedLineDialogAction): void {
    this.dialogRef.close(action);
  }
}