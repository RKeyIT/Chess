import { MouseEvent, useEffect, useState } from 'react';
import { Coordinates, xyType } from '../Coordinates/Coordinates';
import { Piece } from '../Piece/PieceAbstraction';
import { Board, IBoardField } from './BoardModel';
import styles from './BoardStyles.module.css';

interface IBoardState {
  selectedPiece: Piece | null; // pickedPiece state
  prevCoords: xyType | null; // chosenCoords state
  prevField: IBoardField | null; // prevPieceField state
  selectedMoveField: IBoardField | null; // nextPieceField state
  moveTargets: xyType[] | null; // targets state
}

export function BoardComponent() {
  // NOTE - check info about useMemo
  // Try to use it instead of "Force re-render"

  const board = Board.getInstanceLink().board;
  const coords: xyType[] = Coordinates.xyArray;

  const [state, setState] = useState<IBoardState>({
    selectedPiece: null,
    moveTargets: null,
    prevField: null,
    prevCoords: null,
    selectedMoveField: null,
  });

  useEffect(() => {
    setState((prev) => {
      const { moveTargets, selectedPiece, prevField } = state;
      /* NOTE - Conditions
        1. moveTargets && selectedPiece
        2. moveTargets && !selectedPiece 
        3. !moveTargets && selectedPiece
        4. prevPieceField && !selectedPiece
      */

      // NOTE - Cell highlighting scenario (piece was selected and target coords were received)
      if (moveTargets && selectedPiece) {
        moveTargets.forEach((coords: xyType) => {
          board[coords].cell.isUnderAttack = true;
        });

        return prev;
      }

      // NOTE - Cell highlight cancelling scenario (piece was dropped)
      if (moveTargets && !selectedPiece) {
        moveTargets.forEach((coords: xyType) => {
          board[coords].cell.isUnderAttack = false;
        });

        return { ...prev, moveTargets: null };
      }

      // NOTE - Prev piece coords saving (piece was selected)
      if (
        !moveTargets &&
        selectedPiece &&
        prevField &&
        selectedPiece.coordinates !== prevField.cell.coordinates
      ) {
        const prevField = board[selectedPiece.coordinates];
        return {
          ...prev,
          prevField: prevField,
        };
      }

      // NOTE - Field clearing from piece (piece was moved)
      if (!selectedPiece && prevField && moveTargets) {
        return {
          ...prev,
          prevField: { ...prev.prevField, piece: null } as IBoardField,
        };
      }

      console.log('DEFAULT CASE: No one condition are not truly');

      return prev;
    });
  }, [state.selectedPiece, state.prevCoords, state.moveTargets, board, state]);

  // SECTION - Force re-render mechanism
  const [reRender, forceReRender] = useState(1);
  useEffect(() => {
    forceReRender(0);
  }, [state.selectedPiece]);

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
    const { selectedPiece, prevCoords } = state;

    const target = e.target as HTMLDivElement;
    const isHTML = target && target.parentNode instanceof HTMLDivElement;
    const isSVG = target && target.parentNode instanceof SVGElement;
    const targetCoords: xyType | null = getCoords();

    // NOTE - Selected piece logic
    if (selectedPiece && targetCoords && prevCoords) {
      // missclick or click on unavailable cell or click on same cell
      if (
        board[targetCoords].cell.isUnderAttack === false ||
        targetCoords === prevCoords
      ) {
        setState((prev) => ({
          ...prev,
          prevCoords: null,
          selectedPiece: null,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          prevCoords: selectedPiece.coordinates,
        }));

        selectedPiece.setNewCoords(targetCoords);
        board[prevCoords].piece = null;
        board[targetCoords].piece = selectedPiece;

        setState((prev) => ({
          ...prev,
          prevCoords: null,
          selectedPiece: null,
        }));
      }
    }

    // NOTE - Piece is not chosen yet and will be selected right now
    if (!selectedPiece && targetCoords && board[targetCoords].piece) {
      setState((prev) => ({
        ...prev,
        prevCoords: targetCoords,
        selectedPiece: board[targetCoords].piece,
        moveTargets: board[targetCoords].piece!.getTargets(), // find possible moves
      }));
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
