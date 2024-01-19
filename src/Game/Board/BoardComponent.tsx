import { Coordinates, xyType } from '../Coordinates/Coordinates';
import { Board } from './BoardModel';
import styles from './BoardStyles.module.css';

export function BoardComponent() {
  const keys: xyType[] = Coordinates.xyArray;

  return (
    <div className={styles.Board}>
      {keys.map((key: xyType) => {
        return Board.getFieldLink(key).cell.component;
      })}
    </div>
  );
}
