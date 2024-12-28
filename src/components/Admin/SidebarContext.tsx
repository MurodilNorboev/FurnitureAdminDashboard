import React, { createContext, useContext, useState } from 'react';

// Context yaratish
const SidebarContext = createContext<any>(null);

// Context provider funksiyasi
export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Item bosilganda bu funksiyani chaqiring
  const handleClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <SidebarContext.Provider value={{ selectedItem, handleClick }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Contextni olish uchun custom hook
export const useSidebarContext = () => useContext(SidebarContext);
