import React from 'react';
import { useNavigate } from 'react-router-dom';

import useSidebar from '../../Hooks/useSidebar';
import useAuth from '../../Hooks/useAuth';
import { routes } from './SidebarMock';

import type { ISidebarBtn } from '../../Types';
import './SidebarButton.scss';
import './Sidebar.scss';


const Sidebar: React.FC = () => {

  const navigate = useNavigate();
  const { isExpanded, setIsPressed, isPressed } = useSidebar();
  const { user } = useAuth();

  const handleNavigate = (btn: ISidebarBtn) => {
    setIsPressed(btn.name);
    navigate(btn.path);
  }

  const renderSidebar = () => {
    if (!user) return;

    return (
      <nav className='scroll-container'>
        <div className='nav-content'>
          {routes.map((button, index) => (
            <>
              <ul>
                <li key={index}>

                  {button.name === isPressed ? (
                    <div
                      className={`button-content ${isPressed ? 'pressed' : ''}`}
                      onClick={() => handleNavigate(button)}
                    >
                      <i className={`${button.icon}`} />
                      <span>{button.name}</span>
                    </div>
                  ) : (
                    <div
                      className="button-content"
                      onClick={() => handleNavigate(button)}
                    >
                      <i className={`${button.icon}`} />
                      <span>{button.name}</span>
                    </div>
                  )}
                </li>
              </ul>
            </>
          ))}
        </div>
      </nav>
    );
  };


  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {isExpanded ?
        <> {renderSidebar()} </>
        :
        <></>
      }
    </div>
  );
};

export default Sidebar;