import styles from './Game.module.css';
import { BoardComponent } from './view/BoardComponent';

export function Game() {
  return (
    <div className={styles.Game}>
      <BoardComponent />
    </div>
  );
}
