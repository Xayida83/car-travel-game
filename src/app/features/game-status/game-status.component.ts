import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameStatus } from '../../core/models/game-state.model';

@Component({
  selector: 'app-game-status',
  standalone: true,
  imports: [],
  templateUrl: './game-status.component.html',
  styleUrl: './game-status.component.scss',
})
export class GameStatusComponent {
  @Input({ required: true }) status!: GameStatus;
  @Input({ required: true }) markedCount!: number;
  @Input({ required: true }) totalCount!: number;
  @Input({ required: true }) remainingCount!: number;

  @Output() resetGame = new EventEmitter<void>();

  onResetGame(): void {
    this.resetGame.emit();
  }
}