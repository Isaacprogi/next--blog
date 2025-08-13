import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import prisma from '../utils/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import BlogCard from '../components/general/BlogPost';

async function getData(userId?: string) {
  return await prisma.blogPost.findMany({
    where: {
      authorId: userId || undefined,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

const Dashboard = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">You must be logged in to view your dashboard.</p>
      </div>
    );
  }

  const data = await getData(user.id);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Blog Articles</h2>
        <Link
          href="/dashboard/create"
          className={buttonVariants({ variant: 'outline' })}
        >
          Create new blog
        </Link>
      </div>

      {data.length === 0 ? (
        <p className="mt-6 text-gray-500">You haven’t written any blog posts yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {data.map((item) => (
            <BlogCard
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              imageUrl={item.imagUrl}
              authorName={item.authorName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
