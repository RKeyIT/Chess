import styles from './Game.module.css';
import { Board } from './model/BoardModel';

export function Game() {
  const board = Board.getInstanceLink();

  return <div className={styles.Game}>{board.component}</div>;
}
