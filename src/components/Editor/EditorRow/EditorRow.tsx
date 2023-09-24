import CreateLogo from '@/assets/icons/create.svg?react';
import RemoveLogo from '@/assets/icons/remove.svg?react';
import { useAppDispatch, useAppSelector } from '@/services/store/hooks';
import { useRemoveRowMutation } from '@/services/store/services/project';
import {
  createEmptyRow,
  deleteRow,
  setEditingId,
} from '@/services/store/slices/projectSlice';
import React, { useEffect, useState } from 'react';
import styles from './EditorRow.module.scss';
import { getColumnsArray } from './EditorRow.service';
import { EditorRowProps } from './EditorRow.types';

function EditorRow({ row, level, parentId }: EditorRowProps) {
  const dispatch = useAppDispatch();
  const editingId = useAppSelector((state) => state.project.editingId);
  const [isEditing, setIsEditing] = useState(editingId === row.id);
  const [removeRow] = useRemoveRowMutation();

  useEffect(() => {
    if (editingId !== row.id) setIsEditing(false);
  }, [editingId, row.id]);

  const enableEditingMode = () => {
    if (editingId === undefined) {
      dispatch(setEditingId(row.id));
      setIsEditing(true);
    }
  };

  const disableEditingMode = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      dispatch(setEditingId());
      setIsEditing(false);
    }
  };

  const createRow = () => {
    if (editingId === undefined) dispatch(createEmptyRow(row.id));
  };

  const deleteCurrentRow = () => {
    if (editingId === undefined) {
      removeRow(row.id);
      dispatch(deleteRow(row.id));
    }
  };

  return (
    <div
      className={styles.row}
      onDoubleClick={enableEditingMode}
      onKeyDown={disableEditingMode}
    >
      <div className={styles.column}>
        <div className={styles.btns} style={{ marginLeft: `${level * 20}px` }}>
          {level ? <div className={styles.line} /> : <></>}
          <div className={styles.btns_bg}>
            <button
              type="button"
              className={styles.create_btn}
              onClick={createRow}
            >
              <CreateLogo />
            </button>
            <button
              type="button"
              className={styles.delete_btn}
              onClick={deleteCurrentRow}
            >
              <RemoveLogo />
            </button>
          </div>
        </div>
        {isEditing && (
          <input name="rowId" value={row.id} className={styles.id} readOnly />
        )}
        {isEditing && parentId ? (
          <input
            name="parentId"
            value={parentId}
            className={styles.id}
            readOnly
          />
        ) : (
          <></>
        )}
        <button type="submit" className={styles.submit} />
      </div>
      {getColumnsArray(row).map((column) => (
        <div className={styles.column} key={column.name}>
          {isEditing ? (
            <input
              type={column.type}
              defaultValue={column.value}
              name={column.name.toString()}
              className={styles.input}
            />
          ) : (
            column.value
          )}
        </div>
      ))}
    </div>
  );
}

export default EditorRow;
