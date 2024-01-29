import styles from './Game.module.css';
import { Board } from './model/BoardModel';
import { BoardComponent } from './view/BoardComponent';

export function Game() {
  const board = Board.getInstanceLink();

  return (
    <div className={styles.Game}>
      <BoardComponent />
    </div>
  );
}
