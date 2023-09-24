import { createSlice } from '@reduxjs/toolkit';
import { RowTree } from '@/services/types';
import type { RootState } from '../index';
import type { PayloadAction } from '@reduxjs/toolkit';
import { findAndDeleteRow, findRow } from '@/services/utils/rows';

interface NewRow {
  newRow: RowTree;
  parentId: number;
}

const initialState = {
  rows: [] as RowTree[] | null,
  editingId: undefined as number | undefined,
  isLoading: false as boolean,
};

const slice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setRows: (state, { payload: rows }: PayloadAction<RowTree[]>) => {
      state.rows = rows;
    },
    addRow: (
      state,
      { payload: { newRow, parentId } }: PayloadAction<NewRow>
    ) => {
      let parent: RowTree[] | undefined;
      if (parentId) {
        if (!state.rows) return;
        const row = findRow(state.rows, parentId);
        if (!row) return;
        parent = row.child;
      } else {
        parent = state.rows || undefined;
      }
      if (!parent) return;
      parent.pop();
      parent.push({
        ...newRow,
        child: [],
      });
      state.editingId = undefined;
    },
    changeRow: (state, { payload: newRow }: PayloadAction<RowTree>) => {
      if (!state.rows) return;
      const row = findRow(state.rows, newRow.id);
      if (!row) return;
      row.rowName = newRow.rowName;
      row.salary = newRow.salary;
      row.overheads = newRow.overheads;
      row.estimatedProfit = newRow.estimatedProfit;
      row.equipmentCosts = newRow.equipmentCosts;
      state.editingId = undefined;
    },
    deleteRow: (state, { payload: rowId }: PayloadAction<number>) => {
      if (!state.rows) return;
      findAndDeleteRow(state.rows, rowId);
    },
    setEditingId: (
      state,
      { payload: id }: PayloadAction<number | undefined>
    ) => {
      state.editingId = id;
    },
    createEmptyRow: (
      state,
      { payload: parentId }: PayloadAction<number | undefined>
    ) => {
      let parent: RowTree[] | undefined;
      if (parentId) {
        if (!state.rows) return;
        const row = findRow(state.rows, parentId);
        if (!row) return;
        parent = row.child;
      } else {
        parent = state.rows || undefined;
      }
      if (!parent) return;
      parent.push({
        equipmentCosts: 0,
        estimatedProfit: 0,
        id: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        rowName: '',
        salary: 0,
        supportCosts: 0,
        total: 0,
        child: [],
      });
      state.editingId = 0;
    },
    setLoading: (state, { payload: isLoading }: PayloadAction<boolean>) => {
      state.isLoading = isLoading;
    },
  },
});

export const {
  setRows,
  setEditingId,
  createEmptyRow,
  setLoading,
  addRow,
  changeRow,
  deleteRow,
} = slice.actions;

export const selectRows = (state: RootState) => state.project.rows;
export const selectEditingId = (state: RootState) => state.project.editingId;

export default slice.reducer;
