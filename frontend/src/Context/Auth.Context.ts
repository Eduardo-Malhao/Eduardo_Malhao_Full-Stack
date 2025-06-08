import { createContext } from 'react';
import type { IMe } from '../Features/Auth/Types';

export interface AuthContextType {
  user: IMe | undefined;
  setUser: React.Dispatch<React.SetStateAction<IMe>>;
}

const SidebarContext = createContext<AuthContextType | undefined>(undefined);

export default SidebarContext;
