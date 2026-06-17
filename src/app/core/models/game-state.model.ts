import { BoardItem } from './board-item.model';
import { Player } from './player.model';

export type GameStatus = 'setup' | 'playing' | 'finished';

export type GameState = {
  status: GameStatus;
  players: Player[];
  board: BoardItem[];
  activePlayerId?: string;
  selectedImageIndex?: number;
};