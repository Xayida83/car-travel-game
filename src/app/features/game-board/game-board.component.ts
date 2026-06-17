import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BoardItem } from '../../core/models/board-item.model';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [GameCardComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent {
  @Input({ required: true }) board!: BoardItem[];

  @Output() mark = new EventEmitter<string>();
  @Output() unmark = new EventEmitter<string>();
  @Output() longPress = new EventEmitter<string>();

  onMark(itemId: string): void {
    this.mark.emit(itemId);
  }

  onUnmark(itemId: string): void {
    this.unmark.emit(itemId);
  }

  onLongPress(itemId: string): void {
    this.longPress.emit(itemId);
  }
}