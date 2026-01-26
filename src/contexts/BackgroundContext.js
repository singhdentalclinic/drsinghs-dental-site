'use client';

import { createContext, useContext, useState } from 'react';

const BackgroundContext = createContext();

export function BackgroundProvider({ children }) {
  // Default to the first section's background (Hero)
  const [bgClass, setBgClass] = useState(
    'bg-gradient-to-br from-primary/5 via-background to-secondary/5'
  );

  return (
    <BackgroundContext.Provider value={{ bgClass, setBgClass }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  return useContext(BackgroundContext);
}
