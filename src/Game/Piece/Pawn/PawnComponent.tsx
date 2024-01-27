import styles from '../Piece.module.css';
import { IPieceProps } from '../PieceComponent';

export function PawnComponent({ model }: IPieceProps) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      className={`${styles.Piece} ${styles[model.color]} ${
        model.isSelected && styles.active
      }`}
    >
      <path d="M19 22H5v-2h14v2m-3-4H8l2.18-8H8V8h2.72l.07-.26A2.97 2.97 0 0 1 9.25 6.2c-.67-1.52.02-3.29 1.54-3.95c1.52-.67 3.29.02 3.95 1.54a2.99 2.99 0 0 1-1.54 3.95l.07.26H16v2h-2.18L16 18Z" />
    </svg>
  );
}
