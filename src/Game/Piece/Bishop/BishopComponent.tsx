import styles from '../Piece.module.css';
import { IPieceProps } from '../PieceComponent';

export function BishopComponent({ model }: IPieceProps) {
  return (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`${styles.Piece} ${styles[model.color]}`}
    >
      <path d="M19 22H5v-2h14v2M17.16 8.26A8.94 8.94 0 0 1 19 13c0 2.76-3.13 5-7 5s-7-2.24-7-5c0-2.38 2.33-6.61 5.46-7.73c-.3-.36-.46-.81-.46-1.27a2 2 0 0 1 2-2a2 2 0 0 1 2 2c0 .46-.16.91-.46 1.27c.86.33 1.64.83 2.3 1.47l-4.55 4.55l1.42 1.42l4.45-4.45Z" />
    </svg>
  );
}
