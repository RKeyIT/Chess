import styles from './Game.module.css';
import { Board } from './Board/BoardModel';

export function Game() {
  const board = Board.getInstanceLink();

  return <div className={styles.Game}>{board.component}</div>;
}
