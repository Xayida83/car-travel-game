import { BoardItem } from './board-item.model';
import { Player } from './player.model';
import { CompletedLine } from './completed-line.model';

export type GameStatus = 'setup' | 'playing' | 'finished';

export type GameState = {
  status: GameStatus;
  players: Player[];
  board: BoardItem[];
  activePlayerId?: string;
  selectedImageIndex?: number;

  completedLines: CompletedLine[];
  notifiedCompletedLineIds: string[];
};