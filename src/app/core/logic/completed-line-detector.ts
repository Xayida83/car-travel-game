import { BoardItem } from '../models/board-item.model';
import { CompletedLine } from '../models/completed-line.model';

const COLUMN_COUNT = 4;

export function getCompletedLines(board: BoardItem[]): CompletedLine[] {
  return [
    ...getCompletedRows(board),
    ...getCompletedColumns(board),
  ];
}

function getCompletedRows(board: BoardItem[]): CompletedLine[] {
  const completedRows: CompletedLine[] = [];
  const rowCount = Math.ceil(board.length / COLUMN_COUNT);

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const rowItems = board.slice(
      rowIndex * COLUMN_COUNT,
      rowIndex * COLUMN_COUNT + COLUMN_COUNT
    );

    if (rowItems.length !== COLUMN_COUNT) {
      continue;
    }

    const isRowCompleted = rowItems.every((item) => item.isMarked);

    if (isRowCompleted) {
      completedRows.push({
        id: `row-${rowIndex}`,
        direction: 'row',
        itemIds: rowItems.map((item) => item.id),
      });
    }
  }

  return completedRows;
}

function getCompletedColumns(board: BoardItem[]): CompletedLine[] {
  const completedColumns: CompletedLine[] = [];
  const rowCount = Math.ceil(board.length / COLUMN_COUNT);

  for (let columnIndex = 0; columnIndex < COLUMN_COUNT; columnIndex++) {
    const columnItems: BoardItem[] = [];

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const itemIndex = rowIndex * COLUMN_COUNT + columnIndex;
      const item = board[itemIndex];

      if (item) {
        columnItems.push(item);
      }
    }

    /*
      För 16 bilder:
      kolumnen har 4 bilder.

      För 32 bilder:
      kolumnen har 8 bilder.

      Men vi vill hitta fyra i rad, inte kräva att hela 8-bilderskolumnen är markerad.
      Därför kontrollerar vi grupper om 4 i kolumnen.
    */
    for (let startIndex = 0; startIndex <= columnItems.length - 4; startIndex++) {
      const fourItems = columnItems.slice(startIndex, startIndex + 4);
      const isCompleted = fourItems.every((item) => item.isMarked);

      if (isCompleted) {
        completedColumns.push({
          id: `column-${columnIndex}-${startIndex}`,
          direction: 'column',
          itemIds: fourItems.map((item) => item.id),
        });
      }
    }
  }

  return completedColumns;
}