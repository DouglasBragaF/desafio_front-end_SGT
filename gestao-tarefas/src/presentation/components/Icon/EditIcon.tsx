import styles from './Icon.module.css';

const EditIcon = ({ onClick }: any) => (
  <button onClick={onClick} className={styles.iconButton}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={styles.icon}
    >
      <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.71-10.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  </button>
);

export default EditIcon;