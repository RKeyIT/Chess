import { Coordinates, xyType } from '../Coordinates/Coordinates';
import { Board } from './BoardModel';
import styles from './BoardStyles.module.css';

export function BoardComponent() {
  const board = Board.getInstanceLink().board;
  const coords: xyType[] = Coordinates.xyArray;

  return (
    <div className={styles.Board}>
      {coords.map((coord: xyType) => {
        return board[coord].cell.component;
      })}
    </div>
  );
}
