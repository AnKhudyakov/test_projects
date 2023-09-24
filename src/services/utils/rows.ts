import { RowTree } from '@/services/types';

export const findRow = (rows: RowTree[], rowId: number) => {
  const stack = [...rows];
  let result: RowTree | undefined;
  while (stack.length > 0) {
    const node = stack.pop();
    if (node?.id === rowId) {
      result = node;
      continue;
    }
    if (node?.child?.length) {
      stack.push(...node.child);
    }
  }
  return result;
};

export const findAndDeleteRow = (rows: RowTree[], rowId: number) => {
  const index = rows.findIndex((item) => item.id === rowId);
  if (index >= 0) {
    rows.splice(index, 1);
    return;
  }
  rows.forEach((row) => findAndDeleteRow(row.child, rowId));
};
