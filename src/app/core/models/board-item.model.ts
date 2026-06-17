import { ImageBankItem } from './image-bank-item.model';

export type BoardItem = {
  id: string;
  image: ImageBankItem;
  isMarked: boolean;
};