import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { BoardItem } from '../../core/models/board-item.model';

export type ImageViewerDialogData = {
  items: BoardItem[];
  selectedIndex: number;
};

@Component({
  selector: 'app-image-viewer-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './image-viewer-dialog.component.html',
  styleUrl: './image-viewer-dialog.component.scss',
})
export class ImageViewerDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ImageViewerDialogComponent>);
  readonly data = inject<ImageViewerDialogData>(MAT_DIALOG_DATA);

  currentIndex = this.data.selectedIndex;

  private pointerStartX = 0;
  private pointerStartY = 0;

  get currentItem(): BoardItem {
    return this.data.items[this.currentIndex];
  }

  get hasMultipleItems(): boolean {
    return this.data.items.length > 1;
  }

  close(): void {
    this.dialogRef.close();
  }

  showPrevious(): void {
    if (!this.hasMultipleItems) {
      return;
    }

    this.currentIndex =
      this.currentIndex === 0
        ? this.data.items.length - 1
        : this.currentIndex - 1;
  }

  showNext(): void {
    if (!this.hasMultipleItems) {
      return;
    }

    this.currentIndex =
      this.currentIndex === this.data.items.length - 1
        ? 0
        : this.currentIndex + 1;
  }

  onPointerDown(event: PointerEvent): void {
    this.pointerStartX = event.clientX;
    this.pointerStartY = event.clientY;
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.hasMultipleItems) {
      return;
    }

    const deltaX = event.clientX - this.pointerStartX;
    const deltaY = event.clientY - this.pointerStartY;

    const minSwipeDistance = 50;
    const maxVerticalMovement = 60;

    const isHorizontalSwipe =
      Math.abs(deltaX) > minSwipeDistance &&
      Math.abs(deltaY) < maxVerticalMovement;

    if (!isHorizontalSwipe) {
      return;
    }

    if (deltaX < 0) {
      this.showNext();
      return;
    }

    this.showPrevious();
  }

  onArrowLeft(): void {
    this.showPrevious();
  }

  onArrowRight(): void {
    this.showNext();
  }

  onContextMenu(event: Event): void {
    event.preventDefault();
  }
}