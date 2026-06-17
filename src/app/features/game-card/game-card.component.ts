import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoardItem } from '../../core/models/board-item.model';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  @Input({ required: true }) item!: BoardItem;

  @Output() mark = new EventEmitter<string>();
  @Output() unmark = new EventEmitter<string>();
  @Output() longPress = new EventEmitter<string>();

  private longPressTimer?: number;
  private suppressNextClick = false;

  private pointerStartX = 0;
  private pointerStartY = 0;
  private readonly longPressDelay = 400;
  private readonly moveTolerance = 12;

  onPointerDown(event: PointerEvent): void {
    if (this.item.isMarked) {
      return;
    }

    this.clearLongPressTimer();

    this.suppressNextClick = false;
    this.pointerStartX = event.clientX;
    this.pointerStartY = event.clientY;

    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture?.(event.pointerId);

    this.longPressTimer = window.setTimeout(() => {
      this.suppressNextClick = true;
      this.longPress.emit(this.item.id);
    }, this.longPressDelay);
  }

  onPointerMove(event: PointerEvent): void {
    const movedX = Math.abs(event.clientX - this.pointerStartX);
    const movedY = Math.abs(event.clientY - this.pointerStartY);

    if (movedX > this.moveTolerance || movedY > this.moveTolerance) {
      this.clearLongPressTimer();
    }
  }

  onPointerUp(): void {
    this.clearLongPressTimer();
  }

  onPointerCancel(): void {
    this.clearLongPressTimer();
  }

  onPointerLeave(): void {
    this.clearLongPressTimer();
  }

  onClick(): void {
    if (this.suppressNextClick) {
      this.suppressNextClick = false;
      return;
    }

    this.onMark();
  }

  onMark(): void {
    if (this.item.isMarked) {
      return;
    }

    this.mark.emit(this.item.id);
  }

  onUnmark(): void {
    this.unmark.emit(this.item.id);
  }

  onContextMenu(event: Event): void {
    event.preventDefault();
  }

  private clearLongPressTimer(): void {
    if (!this.longPressTimer) {
      return;
    }

    window.clearTimeout(this.longPressTimer);
    this.longPressTimer = undefined;
  }
}