import { Coordinates, xyType } from '../Coordinates/Coordinates';
import { Board } from './BoardModel';
import styles from './BoardStyles.module.css';

export function BoardComponent() {
  // FIXME - Component should look for data only and do not to change it!

  const board = Board.getInstanceLink().board;
  const coords: xyType[] = Coordinates.xyArray;

  const renderBoard = () => {
    return coords.map((coord: xyType) => {
      return board[coord].cell.component;
    });
  };

  return (
    <div className={styles.Board} onClick={Board.click}>
      {renderBoard()}
    </div>
  );
}
