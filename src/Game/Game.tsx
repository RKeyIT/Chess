import styles from './Game.module.css';
import { BoardComponent } from './Board/BoardComponent';

export function Game() {
  return (
    <div className={styles.Game}>
      <BoardComponent></BoardComponent>
    </div>
  );
}
