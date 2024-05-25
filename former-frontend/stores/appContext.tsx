'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AppContextType {
  bookmarks: Set<string>;
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};

export const AppContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('formBookmarks');
    if (storedBookmarks) {
      setBookmarks(new Set(JSON.parse(storedBookmarks)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formBookmarks', JSON.stringify(Array.from(bookmarks)));
  }, [bookmarks]);

  const addBookmark = (id: string) => {
    if (!bookmarks.has(id)) {
      setBookmarks(new Set(bookmarks.add(id)));
    }
  };

  const removeBookmark = (id: string) => {
    if (bookmarks.has(id)) {
      bookmarks.delete(id);
      setBookmarks(new Set(bookmarks));
    }
  };

  const isBookmarked = (id: string): boolean => {
    return bookmarks.has(id);
  };

  return (
    <AppContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </AppContext.Provider>
  );
};
