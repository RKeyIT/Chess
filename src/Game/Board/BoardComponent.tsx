import { useState } from 'react';
import { Coordinates, xyType } from '../Coordinates/Coordinates';
import { Board } from './BoardModel';
import styles from './BoardStyles.module.css';

export function BoardComponent() {
  // Force rerender feature
  const [, ReRender] = useState(0);

  const board = Board.getInstanceLink().board;
  const coords: xyType[] = Coordinates.xyArray;

  return (
    <div onClick={() => ReRender((prev) => prev + 1)} className={styles.Board}>
      {coords.map((coord: xyType) => {
        return board[coord].cell.component;
      })}
    </div>
  );
}
