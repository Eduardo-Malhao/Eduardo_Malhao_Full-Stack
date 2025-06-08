import React, { useState, useEffect, useRef } from "react";
import "./ProfileButton.scss";
import { useNavigate } from "react-router-dom";


interface ButtonProps {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  onLogout: () => void;
}

const ProfileButton: React.FC<ButtonProps> = ({
  id,
  name,
  email,
  avatar,
  onLogout
}) => {

  const navigate= useNavigate();

    const options = [
    {
      id: 1,
      text: 'Perfil',
      icon: 'icon-user',
      onClick: () => navigate(`/profile/${id}`)
    },
    {
      id: 2,
      text:
      'Sair',
      icon: 'icon-exit',
      onClick: onLogout
    },
  ];


  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleProfile = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemOnClick: () => void) => {
    itemOnClick();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-btn" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleProfile}>

        {avatar ? (
          <div className="profile-icon-btn">
            <img
              src={avatar}
              alt={name}
            />
          </div>
        ) : (
          <div className="profile-icon-btn">
            <i className="icon-user no-avatar-icon"></i>
          </div>
        )}

        <div className="dropdown-text-container">
          <p className="dropdown-title">{name}</p>
          <p className="dropdown-description">{email}</p>
        </div>

        <i className={`icon-chevron chevron ${isOpen ? "open" : ""}`}></i>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.id}
              className="dropdown-item"
              onClick={() => handleItemClick(option.onClick)}
            >
              <i className={`me-2 ${option.icon}`} />
              {option.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
