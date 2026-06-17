import { ImageBankItem } from '../models/image-bank-item.model';

export function getRandomUniqueImages(
  images: ImageBankItem[],
  count: number
): ImageBankItem[] {
  if (count > images.length) {
    throw new Error('Cannot select more images than exist in the image bank.');
  }

  return [...images]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}