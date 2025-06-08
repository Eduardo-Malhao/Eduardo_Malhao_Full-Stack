import React from 'react';
import { Spinner } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.scss';


interface ModalProps {
  show: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  size?: 'small' | 'medium' | 'large';
  title: string;
  children: React.ReactNode;
  submitButtonText?: string;
  isLoading?: boolean;
  isValid?: boolean;
}

const Modal_: React.FC<ModalProps> = ({ show, onClose, onCancel, onSubmit, title, children, size = 'medium', submitButtonText, isLoading, isValid = true }) => {
  if (!show) return null;

  const sizeClass = size === 'small' ? 'modal-sm' : size === 'large' ? 'modal-lg' : 'modal-md';

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      role="dialog"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className={`modal-dialog modal-dialog-centered ${sizeClass}`} role="document">
        <div className="modal-content">

          <div className="modal-header">

            <h5 className="modal-title">{title}</h5>

            <button
              type="button"
              className="btn-close close-button"
              aria-label="Close"
              onClick={onClose}
              style={{ background: 'none', border: 'none', fontSize: '1.5rem', lineHeight: 1 }}
            >
              &times;
            </button>
          </div>

          <form
            id="modal-form"

            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >

            <div className="modal-body">
              {children}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="modal-button secondary"
                onClick={onCancel}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="modal-button primary"
                disabled={isLoading || !isValid}
              >
                {isLoading ? <Spinner /> : submitButtonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal_;