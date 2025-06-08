import React, { useEffect, useState, useMemo, type ReactNode } from "react";
import SidebarContext from "../Context/Sidebar.Context";

import type { SidebarContextType } from "../Context/Sidebar.Context";

interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<string>('Home');

  useEffect(() => {
    const storedIsExpanded = localStorage.getItem("isExpanded");
    const storedSelectedButton = localStorage.getItem("isPressed");

    setIsExpanded(storedIsExpanded === 'true');
    setIsPressed(storedSelectedButton || 'Home');
  }, [setIsExpanded, setIsPressed]);

  useEffect(() => {
    localStorage.setItem("isExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  useEffect(() => {
    localStorage.setItem("isPressed", JSON.stringify(isPressed));
  }, [isPressed]);


  const toggleSidebar = (): void => {
    setIsExpanded(prevState => !prevState);
  };

  const value = useMemo<SidebarContextType>(
    () => ({
      isExpanded,
      setIsExpanded,
      isPressed,
      setIsPressed,
      toggleSidebar,
    }),
    [isExpanded, isPressed]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;
