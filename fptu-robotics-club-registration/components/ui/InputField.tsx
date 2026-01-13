import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  iconName: string;
  error?: string;
  helperText?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  iconName,
  id,
  required,
  className,
  error,
  helperText,
  ...props
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-bold text-text-main mb-2" htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted material-symbols-outlined text-[20px] select-none">
          {iconName}
        </span>
        <input
          id={id}
          required={required}
          className={`w-full rounded-lg border border-surface-border bg-white pl-11 pr-4 py-3 text-text-main focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-muted shadow-sm ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          }`}
          {...props}
        />
      </div>
      {helperText && !error && (
        <p className="mt-1 text-xs text-text-muted">{helperText}</p>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};
