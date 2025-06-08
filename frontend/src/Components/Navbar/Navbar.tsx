import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import ProfileButton from '../ProfileButton/ProfileButton';
import CustomAlerts from '../CustomAlerts/CustomAlerts';

import useAuth from '../../Hooks/useAuth';
import useSidebar from '../../Hooks/useSidebar';
import useToast from '../../Hooks/useToast';

import '../Loading/Structure/LoadingStructure.scss';
import './Navbar.scss';
import { useGet_Profile } from '../../Features/Profile/Api';
import type { IMe } from '../../Features/Auth/Types';


const Navbar: React.FC = () => {

  const navigate = useNavigate();

  const { isExpanded, toggleSidebar } = useSidebar();
  const { user, setUser } = useAuth();
  const { toast, setToast } = useToast();

  const rawId = localStorage.getItem('HMZ-Authenticated-User');
  let parsedId: number | undefined;

  try {
    if (rawId !== null) {
      parsedId = JSON.parse(rawId);
      if (typeof parsedId !== 'number') {
        parsedId = undefined;
      }
    }
  } catch (error) {
    parsedId = undefined;
  }

  const { data: profile } = useGet_Profile({
    variables: { id_user: parsedId! },
    enabled: !!parsedId,
  });

  useEffect(() => { profile && setUser(profile.data as IMe) }, [profile]);

useEffect(() => {
  const token = localStorage.getItem('HMZ-Authentication-Token');
  const user = localStorage.getItem('HMZ-Authenticated-User');

  if (!token || !user) {
    localStorage.removeItem('HMZ-Authentication-Token');
    localStorage.removeItem('HMZ-Authenticated-User');
    
    setUser({} as IMe);

    setToast({
      message: "Sessão expirada. Por favor, faça login novamente.",
      type: "error",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }
}, []);


  const onLogout = () => {
    localStorage.removeItem('HMZ-Authentication-Token');
    localStorage.removeItem('HMZ-Authenticated-User');

    setToast({
      message: "Logout realizado com sucesso.",
      type: "success",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };


  return (
    <>
      <div className={`navbar-container ${isExpanded ? 'expanded' : 'collapsed'}`}>

        <div className={`navbar-toggler-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
          <i className="icon-menu nav-icon" onClick={() => toggleSidebar()}></i>
        </div>

        <nav className={`main-navbar ${isExpanded ? 'expanded-navbar' : ''}`}>

          <div className='nav-items'>

            {user && profile ? (
              <ProfileButton
                id={profile.data.id!}
                name={profile.data.first_name}
                email={profile.data.email}
                avatar={profile.data.avatar ?? null}
                onLogout={onLogout}
              />
            ) : (
              <div className="struture-loading">
                <div className="row align-items-center">
                  <div className="col p-0">
                    <div className='structure-loader'
                      style={{ height: "44px" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <Sidebar />
        </nav>
      </div>

      {toast.message && toast.type && (
        <CustomAlerts
          message={toast.message}
          type={toast.type}
        />
      )}
    </>
  );
};

export default Navbar;