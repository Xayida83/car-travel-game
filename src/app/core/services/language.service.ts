import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import { Language, TranslatedText } from '../models/language.model';
import { TRANSLATIONS, TranslationKey } from '../../data/translation';

const languageStorageKey = 'resespelen-language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly languageSignal = signal<Language>(this.getInitialLanguage());

  readonly language = this.languageSignal.asReadonly();

  readonly isSwedish = computed(() => this.languageSignal() === 'sv');
  readonly isEnglish = computed(() => this.languageSignal() === 'en');

  setLanguage(language: Language): void {
    this.languageSignal.set(language);

    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem(languageStorageKey, language);
  }

  translate(key: TranslationKey): string {
    return TRANSLATIONS[this.languageSignal()][key];
  }

  translateText(text: TranslatedText): string {
    return text[this.languageSignal()];
  }

  private getInitialLanguage(): Language {
    if (!this.isBrowser) {
      return 'sv';
    }

    const savedLanguage = localStorage.getItem(languageStorageKey);

    if (savedLanguage === 'sv' || savedLanguage === 'en') {
      return savedLanguage;
    }

    const browserLanguage = navigator.language.toLowerCase();

    if (browserLanguage.startsWith('sv')) {
      return 'sv';
    }

    return 'en';
  }
}