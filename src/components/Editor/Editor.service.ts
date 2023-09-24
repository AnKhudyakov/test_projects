import {
  addRow,
  changeRow,
  createEmptyRow,
  setLoading,
  setRows,
} from '@/services/store/slices/projectSlice';
import { RowTree } from '@/services/types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EditorEffectHook, TargetSave } from './Editor.types';

export const getRowsArray = (rows: RowTree[] | null) => {
  if (!rows?.length) return [];
  const result: {
    row: RowTree;
    level: number;
    parentId: number;
  }[] = [];
  const stack: { node: RowTree; level: number; parentId: number }[] = [];

  stack.push({ node: rows[0], level: 0, parentId: 0 });

  while (stack.length > 0) {
    const item = stack.pop();

    if (!item) {
      continue;
    }

    const { node, level, parentId } = item;
    result.push({ row: node, level, parentId });

    if (node?.child && node?.child.length > 0) {
      node.child.forEach((child) => {
        stack.push({ node: child, level: level + 1, parentId: node.id });
      });
    }
  }

  return result;
};

export const useEditorEffect = ({
  isCreating,
  isUpdating,
  isFetching,
  fetchedRows,
  createdRow,
  updatedRow,
  rows,
}: EditorEffectHook) => {
  const dispatch = useDispatch();
  const eId: string = import.meta.env.VITE_E_ID;

  const [parentId, setParentId] = useState<number>(0);

  useEffect(() => {
    if (fetchedRows) dispatch(setRows(fetchedRows));
  }, [eId, fetchedRows]);

  useEffect(() => {
    if (isCreating || isUpdating || isFetching) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isCreating, isUpdating, isFetching]);

  useEffect(() => {
    if (createdRow) {
      dispatch(addRow({ newRow: createdRow.current, parentId }));
    }
  }, [createdRow]);

  useEffect(() => {
    if (updatedRow) {
      dispatch(changeRow(updatedRow.current));
    }
  }, [updatedRow]);

  useEffect(() => {
    if (rows && !rows.length && !isFetching) {
      dispatch(createEmptyRow());
    }
  }, [rows]);

  return setParentId;
};

export const useDataChanges = (target: EventTarget & TargetSave) => {
  const rowData = {
    rowName: target.rowName.value,
    salary: Number(target.salary.value),
    equipmentCosts: Number(target.equipmentCosts.value),
    overheads: Number(target.overheads.value),
    estimatedProfit: Number(target.estimatedProfit.value),
    id: Number(target.rowId.value),
  };
  return { rowData };
};
