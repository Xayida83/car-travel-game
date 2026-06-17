import { BoardItem } from '../models/board-item.model';
import { ImageBankItem } from '../models/image-bank-item.model';
import { getRandomUniqueImages } from './image-randomizer';

export function createBoard(
  imageBank: ImageBankItem[],
  count: number
): BoardItem[] {
  return getRandomUniqueImages(imageBank, count).map((image) => ({
    id: image.id,
    image,
    isMarked: false,
  }));
}