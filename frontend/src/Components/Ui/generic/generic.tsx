import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';

type GenericInputProps = {
  name: string;
  label: string;
  iconClass?: string;
  upperCase?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  type?: string;
  placeholder?: string;
};

const GenericInput: React.FC<GenericInputProps> = ({
  name,
  label,
  iconClass,
  upperCase = false,
  isDisabled = false,
  isRequired = false,
  type = 'text',
  placeholder,
}) => {

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>
        {label} {isRequired && <span className="text-danger">*</span>}
      </Form.Label>

      <div className="input-group">
        {iconClass && (
          <span className="input-group-text">
            <i className={iconClass}></i>
          </span>
        )}

        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Form.Control
              {...field}
              type={type}
              placeholder={placeholder}
              autoComplete="off"
              disabled={isDisabled}
              className={`
                ${upperCase ? 'text-uppercase' : ''}
                ${error ? 'is-invalid' : ''}
              `}
              value={upperCase ? field.value?.toUpperCase?.() || '' : field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />
        {error && (
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        )}
      </div>
    </Form.Group>
  );
};

export default GenericInput;