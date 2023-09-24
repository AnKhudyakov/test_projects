import MenuIcon from '@/assets/icons/menu.svg?react';
import ShareIcon from '@/assets/icons/share.svg?react';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <a href="#" className={styles.icon}>
          <MenuIcon />
        </a>
        <a href="#" className={styles.icon}>
          <ShareIcon />
        </a>
        <a href="#" className={styles.link_active}>
          Просмотр
        </a>
        <a href="#" className={styles.link}>
          Управление
        </a>
      </nav>
    </header>
  );
}

export default Header;
