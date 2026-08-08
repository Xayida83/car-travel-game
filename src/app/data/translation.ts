import { Language } from '../core/models/language.model';

export type TranslationKey =
  | 'appTitle'
  | 'introText'
  | 'instructionsTitle'
  | 'instructionTapImage'
  | 'instructionTapMark'
  | 'instructionLongPress'
  | 'startGame16'
  | 'startGame32'
  | 'restartGame16'
  | 'restartGame32'
  | 'backToStart'
  | 'found'
  | 'remaining'
  | 'fourInARowTitle'
  | 'allFoundTitle'
  | 'congrats'
  | 'continuePlaying'
  | 'close'
  | 'newGame16'
  | 'newGame32'
  | 'lookFor'
  | 'image'
  | 'of'
  | 'previousImage'
  | 'nextImage'
  | 'closeLargeImage'
    | 'fourInARowMessageHorizontal'
  | 'fourInARowMessageVertical'
  | 'allFoundMessage'
  | 'markAsFound'
  | 'removeMark';

export const TRANSLATIONS: Record<Language, Record<TranslationKey, string>> = {
  sv: {
    appTitle: 'Bilrese-spelet',
    introText: 'Leta efter saker utanför bilen och markera dem när du hittar dem.',
    instructionsTitle: 'Så spelar du',
    instructionTapImage: 'Tryck på en bild när du ser saken utanför bilen.',
    instructionTapMark: 'Tryck på markeringen för att ta bort den.',
    instructionLongPress: 'Håll länge på en bild för att se den större.',
    startGame16: 'Starta spel med 16 bilder',
    startGame32: 'Starta spel med 32 bilder',
    restartGame16: 'Starta om med 16 bilder',
    restartGame32: 'Starta om med 32 bilder',
    backToStart: 'Till startsidan',
    found: 'Hittade',
    remaining: 'Kvar',
    fourInARowTitle: 'Fyra i rad!',
    allFoundTitle: 'Alla föremål hittade!',
    congrats: 'Grattis!',
    continuePlaying: 'Spela vidare',
    close: 'Stäng',
    newGame16: 'Nytt spel med 16 bilder',
    newGame32: 'Nytt spel med 32 bilder',
    lookFor: 'Leta efter',
    image: 'Bild',
    of: 'av',
    previousImage: 'Visa föregående bild',
    nextImage: 'Visa nästa bild',
    closeLargeImage: 'Stäng storbild',
    fourInARowMessageHorizontal: 'Du fick fyra i rad vågrätt.',
    fourInARowMessageVertical: 'Du fick fyra i rad lodrätt.',
    allFoundMessage: 'Du hittade alla föremål.',
    markAsFound: 'Markera som hittad',
    removeMark: 'Ta bort markering',
  },

  en: {
    appTitle: 'Road Trip Game',
    introText: 'Look for things outside the car and mark them when you find them.',
    instructionsTitle: 'How to play',
    instructionTapImage: 'Tap a picture when you see it outside the car.',
    instructionTapMark: 'Tap the mark to remove it.',
    instructionLongPress: 'Press and hold a picture to view it larger.',
    startGame16: 'Start game with 16 pictures',
    startGame32: 'Start game with 32 pictures',
    restartGame16: 'Restart with 16 pictures',
    restartGame32: 'Restart with 32 pictures',
    backToStart: 'Back to start',
    found: 'Found',
    remaining: 'Left',
    fourInARowTitle: 'Four in a row!',
    allFoundTitle: 'All items found!',
    congrats: 'Congratulations!',
    continuePlaying: 'Keep playing',
    close: 'Close',
    newGame16: 'New game with 16 pictures',
    newGame32: 'New game with 32 pictures',
    lookFor: 'Look for',
    image: 'Picture',
    of: 'of',
    previousImage: 'Show previous picture',
    nextImage: 'Show next picture',
    closeLargeImage: 'Close large image',
    fourInARowMessageHorizontal: 'You got four in a row horizontally.',
    fourInARowMessageVertical: 'You got four in a row vertically.',
    allFoundMessage: 'You found all items.',
    markAsFound: 'Mark as found',
    removeMark: 'Remove mark',
  },
};