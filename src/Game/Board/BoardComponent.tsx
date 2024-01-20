import { useState, MouseEvent, useEffect } from 'react';
import { Coordinates, xyType } from '../Coordinates/Coordinates';
import { Board } from './BoardModel';
import styles from './BoardStyles.module.css';

export function BoardComponent() {
  const board = Board.getInstanceLink().board;
  const coords: xyType[] = Coordinates.xyArray;

  const [currentCoord, setCurrentCoord] = useState<xyType>('A1');

  useEffect(() => {
    console.log('useEffect: ' + currentCoord);
  }, [currentCoord, board]);

  const mouseDownHandler = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const isHTML = target && target.parentNode instanceof HTMLDivElement;
    const isSVG = target && target.parentNode instanceof SVGElement;

    let coords;

    if (isHTML) {
      coords = target.parentNode.dataset.coordinates as xyType;

      setCurrentCoord(coords);
    } else if (isSVG) {
      coords = (target.parentNode.parentNode as HTMLDivElement).dataset
        .coordinates as xyType;

      setCurrentCoord(coords);
    } else {
      throw new Error('Unextected else case caused!');
    }
  };

  const mouseUpHandler = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const isHTML = target && target.parentNode instanceof HTMLDivElement;
    const isSVG = target && target.parentNode instanceof SVGElement;

    const getCoords = (): xyType => {
      return isHTML
        ? (target.parentNode.dataset.coordinates as xyType)
        : ((target.parentNode!.parentNode as HTMLDivElement).dataset
            .coordinates as xyType);
    };

    const coords = getCoords();

    if (isHTML || isSVG) {
      const piece = board[currentCoord].piece;

      board[currentCoord].piece = null;
      board[coords].piece = piece;

      console.log(board[currentCoord]);
      console.log(board[coords]);

      setCurrentCoord(coords);
    } else {
      throw new Error('Unextected else case caused!');
    }
  };

  // e.target.offsetParent
  // e.target.parentElement
  // e.target.parentNode

  return (
    <div
      className={styles.Board}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
    >
      {coords.map((coord: xyType) => {
        return board[coord].cell.component;
      })}
    </div>
  );
}
