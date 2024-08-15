import styles from './FormTask.module.css';

interface TextareaFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  required?: boolean;
}

export const TextareaField = ({ id, label, value, onChange, className, required }: TextareaFieldProps) => (
  <div className={styles.row}>
    <div className={styles.col}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        className={className || styles.input}
        required={required}
      />
    </div>
  </div>
);