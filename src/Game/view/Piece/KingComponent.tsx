import { IPieceProps } from '../../types';
import styles from './Piece.module.css';

export function KingComponent({ model }: IPieceProps) {
  return (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`${styles.Piece} ${styles[model.color]}`}
    >
      <path d="M19 22H5v-2h14v2m-2-12c-1.42 0-2.74.77-3.45 2H13V7h3V5h-3V2h-2v3H8v2h3v5h-.55C9.35 10.09 6.9 9.43 5 10.54A4.013 4.013 0 0 0 3.5 16c.74 1.24 2.07 2 3.5 2h10a4 4 0 0 0 4-4a4 4 0 0 0-4-4Z" />
    </svg>
  );
}