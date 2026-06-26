import { Component, inject } from '@angular/core';
import { GameStoreService } from './core/services/game-store.service';
import { GameStatusComponent } from './features/game-status/game-status.component';
import { GameBoardComponent } from './features/game-board/game-board.component';
import { MatDialog } from '@angular/material/dialog';
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
  readonly status = this.gameStore.status;
  readonly board = this.gameStore.board;
  readonly markedCount = this.gameStore.markedCount;
  readonly remainingCount = this.gameStore.remainingCount;
  readonly unmarkedItems = this.gameStore.unmarkedItems;
  readonly availableImageCount = this.gameStore.availableImageCount;
  readonly nextCompletedLineToNotify =
  this.gameStore.nextCompletedLineToNotify;

  startGame(imageCount: number): void {
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

 resetGame(): void {
    this.gameStore.resetGame();
  }
}