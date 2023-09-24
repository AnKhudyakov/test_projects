import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
