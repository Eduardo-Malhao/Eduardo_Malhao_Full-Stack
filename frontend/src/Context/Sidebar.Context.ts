import { createContext } from 'react';

export interface SidebarContextType {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isPressed: string;
  setIsPressed: React.Dispatch<React.SetStateAction<string>>;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export default SidebarContext;
