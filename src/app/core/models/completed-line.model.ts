export type CompletedLineDirection = 'row' | 'column';

export type CompletedLine = {
  id: string;
  direction: CompletedLineDirection;
  itemIds: string[];
};