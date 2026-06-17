import { computed, Injectable, signal } from '@angular/core';

import { IMAGE_BANK } from '../../data/image-bank';
import { createBoard } from '../logic/board-generator';
import { GameState } from '../models/game-state.model';

const initialState: GameState = {
  status: 'setup',
  players: [
    {
      id: 'player-1',
      name: 'Spelare 1',
    },
  ],
  board: [],
  activePlayerId: 'player-1',
};

@Injectable({
  providedIn: 'root',
})
export class GameStoreService {
  private readonly state = signal<GameState>(initialState);

  readonly gameState = this.state.asReadonly();

  readonly status = computed(() => this.state().status);

  readonly board = computed(() => this.state().board);

  readonly markedCount = computed(() =>
    this.state().board.filter((item) => item.isMarked).length
  );

  readonly remainingCount = computed(() =>
    this.state().board.filter((item) => !item.isMarked).length
  );

  readonly unmarkedItems = computed(() =>
  this.state().board.filter((item) => !item.isMarked)
  );

  readonly isFinished = computed(() => this.state().status === 'finished');

  readonly availableImageCount = IMAGE_BANK.length;

  canStartGame(imageCount: number): boolean {
    return imageCount <= IMAGE_BANK.length;
  }

  startNewGame(imageCount: number): void {
    if (!this.canStartGame(imageCount)) {
      return;
    }

    const board = createBoard(IMAGE_BANK, imageCount);

    this.state.set({
      ...initialState,
      status: 'playing',
      board,
    });
  }

  markItem(itemId: string): void {
    const currentState = this.state();

    if (currentState.status !== 'playing') {
      return;
    }

    const board = currentState.board.map((item) =>
      item.id === itemId
        ? { ...item, isMarked: true }
        : item
    );

    const allMarked = board.every((item) => item.isMarked);

    this.state.set({
      ...currentState,
      board,
      status: allMarked ? 'finished' : 'playing',
    });
  }

  unmarkItem(itemId: string): void {
    const currentState = this.state();

    const board = currentState.board.map((item) =>
      item.id === itemId
        ? { ...item, isMarked: false }
        : item
    );

    this.state.set({
      ...currentState,
      board,
      status: 'playing',
    });
  }

  resetGame(): void {
    this.state.set(initialState);
  }
}