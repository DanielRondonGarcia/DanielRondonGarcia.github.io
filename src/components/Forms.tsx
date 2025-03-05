import React, { useState, FormEvent, ChangeEvent } from 'react';

type FieldType = 'text' | 'email' | 'textarea';

interface FormField {
  name: string;
  type: FieldType;
  placeholder: string;
  required?: boolean;
  rows?: number;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, string>) => Promise<void>;
  submitButtonText: string;
  loadingButtonText?: string;
  successMessage?: string;
  className?: string;
}

const Forms: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitButtonText,
  loadingButtonText = 'Sending...',
  successMessage = 'Submitted successfully!',
  className = '',
}) => {
  const initialFormData = fields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as Record<string, string>);

  const [formData, setFormData] = useState<Record<string, string>>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(formData);
      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const { name, type, placeholder, required = false, rows = 5 } = field;

    const commonProps = {
      name,
      placeholder,
      value: formData[name],
      onChange: handleChange,
      required,
      className: 'w-full p-2 bg-gray-800 dark:bg-gray-800 text-white dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary-color-500)]'
    };

    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          rows={rows}
        />
      );
    }

    return (
      <input
        {...commonProps}
        type={type}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {fields.map((field, index) => (
        <div key={field.name} className="mb-4">
          {renderField(field)}
        </div>
      ))}

      <button
        type="submit"
        className="bg-[var(--primary-color-500)] text-white px-6 py-2 rounded font-bold hover:bg-[var(--primary-color-600)] transition-colors duration-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? loadingButtonText : submitButtonText}
      </button>

      {isSubmitted && <p className="text-[var(--primary-color-500)] mt-2">{successMessage}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default Forms;