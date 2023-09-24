import EntityEditor from '@/components/Editor';
import ArrowIcon from '@/assets/icons/arrow.svg?react';
import ProjectIcon from '@/assets/icons/project.svg?react';
import styles from './Review.module.scss';

function Review() {
  return (
    <main className={styles.container}>
      <section className={styles.navbar_header}>
        <div>
          <h2 className={styles.title}>Название проекта</h2>
          <h3 className={styles.subtitle}>Аббревиатура</h3>
        </div>
        <ArrowIcon />
      </section>
      <section className={styles.navbar_content}>
        <ul className={styles.items}>
          <li className={styles.item_active}>
            <ProjectIcon />
            СМР
          </li>
          <li className={styles.item}>
            <ProjectIcon />
            По проекту
          </li>
          <li className={styles.item}>
            <ProjectIcon />
            График
          </li>
        </ul>
      </section>
      <section className={styles.table_header}>
        <h1 className={styles.table_title}>Строительно-монтажные работы</h1>
      </section>
      <section className={styles.table_content}>
        <EntityEditor />
      </section>
    </main>
  );
}

export default Review;
