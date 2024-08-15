import styles from './FormTask.module.css';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  required?: boolean;
  maxLength?: number;
}

export const InputField = ({ id, label, value, onChange, type = "text", className, required, maxLength }: InputFieldProps) => (
  <div className={styles.row}>
    <div className={styles.col}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={className || styles.input}
        required={required}
        maxLength={maxLength}
      />
    </div>
  </div>
);