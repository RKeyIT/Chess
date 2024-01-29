import { useEffect, useState } from 'react';
import { IPieceProps } from '../../types';
import styles from './Piece.module.css';

export function PawnComponent({ model }: IPieceProps) {
  const { color, isSelected } = model;

  const cssDefault = ` ${styles.Piece} ${styles[color]} `;
  const cssSelected = ` ${styles.active} `;

  const [state, setState] = useState({
    css: cssDefault,
    svg: getSVG(cssDefault),
  });

  useEffect(() => {
    setState((prevState) => {
      const updatedCss = isSelected
        ? prevState.css + cssSelected
        : prevState.css.replace(cssSelected, '');

      return {
        css: updatedCss,
        svg: getSVG(updatedCss),
      };
    });
  }, [isSelected]);

  function getSVG(css: string | null = null) {
    return (
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className={css || state.css}
      >
        <path d="M19 22H5v-2h14v2m-3-4H8l2.18-8H8V8h2.72l.07-.26A2.97 2.97 0 0 1 9.25 6.2c-.67-1.52.02-3.29 1.54-3.95c1.52-.67 3.29.02 3.95 1.54a2.99 2.99 0 0 1-1.54 3.95l.07.26H16v2h-2.18L16 18Z" />
      </svg>
    );
  }

  return <>{state.svg}</>;
}
