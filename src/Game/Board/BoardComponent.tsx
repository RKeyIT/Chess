import { useState, MouseEvent, useEffect } from 'react';
import { Coordinates, xyType } from '../Coordinates/Coordinates';
import { Board } from './BoardModel';
import styles from './BoardStyles.module.css';
import { Piece } from '../Piece/PieceAbstraction';

export function BoardComponent() {
  const board = Board.getInstanceLink().board;
  const coords: xyType[] = Coordinates.xyArray;

  const [pickedPiece, setPickedPiece] = useState<Piece | null>(null);
  const [currentCoords, setCurrentCoords] = useState<xyType | null>(null);
  const [reRender, forceReRender] = useState(1);

  // SECTION - Force re-render mechanism
  useEffect(() => {
    forceReRender(0);
  }, [pickedPiece]);

  useEffect(() => {
    forceReRender(1);
  }, [reRender]);
  // !SECTION

  const renderBoard = () => {
    return coords.map((coord: xyType) => {
      return board[coord].cell.component;
    });
  };

  const clickHandler = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const isHTML = target && target.parentNode instanceof HTMLDivElement;
    const isSVG = target && target.parentNode instanceof SVGElement;
    const coordinates: xyType | null = getCoords();

    if (pickedPiece && coordinates && currentCoords) {
      setCurrentCoords(pickedPiece.coordinates);

      board[currentCoords].piece = null;
      board[coordinates].piece = pickedPiece;

      setCurrentCoords(null);
      setPickedPiece(null);
    }

    if (!pickedPiece && coordinates && board[coordinates].piece) {
      setCurrentCoords(coordinates);
      setPickedPiece(board[coordinates].piece);
    }

    function getCoords(): xyType | null {
      if (isHTML) {
        return target.parentNode.dataset.coordinates as xyType;
      }
      if (isSVG) {
        return (target.parentNode!.parentNode as HTMLDivElement).dataset
          .coordinates as xyType;
      }

      return null;
    }
  };

  return (
    <div className={styles.Board} onClick={clickHandler}>
      {reRender && renderBoard()}
    </div>
  );
}
