import FeedCard from '@/components/feed/FeedCard';
import { getAuthenticatedUser } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="bg-white rounded-md box-shadow__card">
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </div>
  );
}
