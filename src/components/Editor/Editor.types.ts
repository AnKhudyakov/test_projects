import { Response, Row, RowTree } from '@/services/types';

export interface EditorRowProps {
  row: Row;
  level: number;
  parentId?: number | undefined;
}

export interface EditorEffectHook {
  isCreating: boolean;
  isUpdating: boolean;
  isFetching: boolean;
  fetchedRows: RowTree[] | undefined;
  createdRow: Response | undefined;
  updatedRow: Response | undefined;
  rows: RowTree[] | null;
}

export interface EditorSaveChangesHook {
  target: EventTarget & TargetSave;
}

export interface TargetSave {
  rowName: { value: string };
  salary: { value: string };
  equipmentCosts: { value: string };
  overheads: { value: string };
  estimatedProfit: { value: string };
  rowId: { value: string };
  parentId: { value: string };
}
