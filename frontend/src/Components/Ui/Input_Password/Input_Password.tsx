import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Form } from 'react-bootstrap';

type PasswordInputProps = {
  name: string;
  label: string;
  iconClass?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  showIcon?: string;
  hideIcon?: string;
};

const Input_Password: React.FC<PasswordInputProps> = ({
  name,
  label,
  isDisabled = false,
  isRequired = false,
  placeholder,
  showIcon,
  hideIcon,
}) => {

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const error = errors[name]?.message as string | undefined;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>
        {label} {isRequired && <span className="text-danger">*</span>}
      </Form.Label>

      <div className="position-relative">
        <div className="input-group">
          <span
            className="input-group-text"
            onClick={togglePasswordVisibility}
          >
            <i className={showPassword ? showIcon : hideIcon}></i>
          </span>

          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Form.Control
                {...field}
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                autoComplete="off"
                disabled={isDisabled}
                className={`${error ? 'is-invalid' : ''} pe-5`}
              />
            )}
          />

          {error && (
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
          )}
        </div>
      </div>
    </Form.Group>
  );
};

export default Input_Password;