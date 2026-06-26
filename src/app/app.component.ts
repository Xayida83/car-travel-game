import { Component, effect, inject } from '@angular/core';
import { GameStoreService } from './core/services/game-store.service';
import { GameStatusComponent } from './features/game-status/game-status.component';
import { GameBoardComponent } from './features/game-board/game-board.component';
import { MatDialog } from '@angular/material/dialog';
import {
  CompletedLineDialogAction,
  CompletedLineDialogComponent,
} from './features/completed-line-dialog/completed-line-dialog.component';
import { ImageViewerDialogComponent } from './features/image-viewer-dialog/image-viewer-dialog.component';


@Component({
  selector: 'app-root',
  imports: [GameStatusComponent, GameBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly gameStore = inject(GameStoreService);
  private readonly dialog = inject(MatDialog);

  private completedLineDialogOpen = false;
  private finishedDialogShown = false; 

  readonly status = this.gameStore.status;
  readonly board = this.gameStore.board;
  readonly markedCount = this.gameStore.markedCount;
  readonly remainingCount = this.gameStore.remainingCount;
  readonly unmarkedItems = this.gameStore.unmarkedItems;
  readonly availableImageCount = this.gameStore.availableImageCount;
  readonly nextCompletedLineToNotify =
  this.gameStore.nextCompletedLineToNotify;

  constructor() {
    effect(() => {
      const status = this.status();
      const completedLine = this.nextCompletedLineToNotify();

      if (this.completedLineDialogOpen) {
        return;
      }

      if (status === 'finished' && !this.finishedDialogShown) {
        this.openCompletedDialog({
          mode: 'all-found',
        });

        return;
      }

      if (status === 'playing' && completedLine) {
        this.openCompletedDialog({
          mode: 'completed-line',
          line: completedLine,
        });
      }
    });
  }

  startGame(imageCount: number): void {
    this.finishedDialogShown = false;
    this.gameStore.startNewGame(imageCount);
  }

  canStartGame(imageCount: number): boolean {
    return this.gameStore.canStartGame(imageCount);
  }

  markItem(itemId: string): void {
    this.gameStore.markItem(itemId);
  }

  unmarkItem(itemId: string): void {
    this.gameStore.unmarkItem(itemId);
  }


  openLargeImage(itemId: string): void {
    const items = this.unmarkedItems();

    if (items.length === 0) {
      return;
    }

    const selectedIndex = items.findIndex((item) => item.id === itemId);

    if (selectedIndex === -1) {
      return;
    }

    this.dialog.open(ImageViewerDialogComponent, {
      data: {
        items,
        selectedIndex,
      },
      width: '92vw',
      maxWidth: '30rem',
      maxHeight: '90dvh',
      autoFocus: 'dialog',
      restoreFocus: true,
    });
  }

  private openCompletedDialog(data: {
  mode: 'completed-line' | 'all-found';
  line?: any;
}): void {
  this.completedLineDialogOpen = true;

  if (data.mode === 'all-found') {
    this.finishedDialogShown = true;
  }

  const dialogRef = this.dialog.open(CompletedLineDialogComponent, {
    data,
    width: '92vw',
    maxWidth: '28rem',
    panelClass: 'completed-line-dialog-panel',
    autoFocus: 'dialog',
    restoreFocus: true,
  });

  dialogRef.afterClosed().subscribe(
    (action?: CompletedLineDialogAction) => {
      this.completedLineDialogOpen = false;

      if (action === 'new-16') {
        this.startGame(16);
        return;
      }

      if (action === 'new-32') {
        this.startGame(32);
        return;
      }

      if (data.mode === 'completed-line' && data.line) {
        this.gameStore.acknowledgeCompletedLine(data.line.id);
      }
    }
  );
}

resetGame(): void {
  this.finishedDialogShown = false;
  this.gameStore.resetGame();
}
}