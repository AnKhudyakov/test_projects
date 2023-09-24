import { Row } from '@/services/types';

export interface EditorRowProps {
  row: Row;
  level: number;
  parentId?: number | undefined;
}
