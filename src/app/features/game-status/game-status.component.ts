import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { GameStatus } from '../../core/models/game-state.model';
import { LanguageService } from '../../core/services/language.service';
import { TranslationKey } from '../../data/translation';

@Component({
  selector: 'app-game-status',
  standalone: true,
  imports: [],
  templateUrl: './game-status.component.html',
  styleUrl: './game-status.component.scss',
})
export class GameStatusComponent {
  private readonly languageService = inject(LanguageService);

  @Input({ required: true }) status!: GameStatus;
  @Input({ required: true }) markedCount!: number;
  @Input({ required: true }) totalCount!: number;
  @Input({ required: true }) remainingCount!: number;

  @Output() resetGame = new EventEmitter<void>();

  t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }
}