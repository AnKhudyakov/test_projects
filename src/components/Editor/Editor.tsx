import Loader from '@/components/Loader';
import { useAppSelector } from '@/services/store/hooks';
import {
  useCreateRowMutation,
  useGetRowsQuery,
  useUpdateRowMutation,
} from '@/services/store/services/project';
import React from 'react';
import styles from './Editor.module.scss';
import {
  getRowsArray,
  useDataChanges,
  useEditorEffect,
} from './Editor.service';
import { TargetSave } from './Editor.types';
import EditorRow from './EditorRow';

function Editor() {
  const { data: fetchedRows, isLoading: isFetching } = useGetRowsQuery({});
  const [createRow, { isLoading: isCreating, data: createdRow }] =
    useCreateRowMutation();
  const [updateRow, { isLoading: isUpdating, data: updatedRow }] =
    useUpdateRowMutation();
  const rows = useAppSelector((state) => state.project.rows);
  const isLoading = useAppSelector((state) => state.project.isLoading);

  const setParentId: React.Dispatch<React.SetStateAction<number>> =
    useEditorEffect({
      isCreating,
      isUpdating,
      isFetching,
      fetchedRows,
      createdRow,
      updatedRow,
      rows,
    });

  const saveChanges = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & TargetSave;
    const { rowData } = useDataChanges(target);
    if (target.rowId.value === '0') {
      const currentParentId = Number(
        target.parentId ? target.parentId.value : 0
      );
      setParentId(currentParentId);
      createRow({ ...rowData, parentId: currentParentId });
    } else {
      updateRow(rowData);
    }
  };

  return (
    <form className={styles.container} onSubmit={saveChanges}>
      <div className={styles.column}>Уровень</div>
      <div className={styles.column}>Наименование работ</div>
      <div className={styles.column}>Основная з/п</div>
      <div className={styles.column}>Оборудование</div>
      <div className={styles.column}>Накладные расходы</div>
      <div className={styles.column}>Сметная прибыль</div>
      {isLoading && <Loader />}
      {rows?.length && !isLoading ? (
        getRowsArray(rows).map((item) => (
          <EditorRow
            key={item.row.id}
            row={item.row}
            level={item.level}
            parentId={item.parentId}
          />
        ))
      ) : (
        <></>
      )}
    </form>
  );
}

export default Editor;
