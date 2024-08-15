import styles from './Icon.module.css';

const DeleteIcon = ({ onClick }: any) => (
  <button onClick={onClick} className={styles.iconButton}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={styles.icon}
    >
      <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1zM18 8H6v11c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8z" />
    </svg>
  </button>
);

export default DeleteIcon;