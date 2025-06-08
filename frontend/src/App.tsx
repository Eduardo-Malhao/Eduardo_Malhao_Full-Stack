import { Outlet } from 'react-router-dom';
import useSidebar from './Hooks/useSidebar';
import Navbar from './Components/Navbar/Navbar';

import './index.scss';

export default function App() {
  const { isExpanded } = useSidebar();

  return (
    <>
      <Navbar />
      <div className='App'>
        <div className={`content ${isExpanded ? 'expanded' : 'collapsed'}`} >
          <Outlet />
        </div>
      </div>
    </>
  );
}
