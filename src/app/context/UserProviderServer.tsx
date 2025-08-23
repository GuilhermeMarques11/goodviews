import { getAuthenticatedUser } from '@/utils/auth';
import { UserProvider } from './UserContext';
import { ReactNode } from 'react';

export default async function UserProviderServer({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getAuthenticatedUser();

  return <UserProvider currentUser={currentUser}>{children}</UserProvider>;
}
