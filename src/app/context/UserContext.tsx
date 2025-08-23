'use client';

import { UserInfo } from '@/types/userInfo';
import { createContext, ReactNode, useContext } from 'react';

type UserContextType = {
  currentUser: UserInfo | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  currentUser,
}: {
  children: ReactNode;
  currentUser: UserInfo | null;
}) {
  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }

  return context;
}
