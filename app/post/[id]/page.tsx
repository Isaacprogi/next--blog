import prisma from '@/app/utils/db'
import { notFound } from 'next/navigation';
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

async function getData(id?: string) {
  const data = await prisma.blogPost.findUnique({
    where: {
      id: id || undefined,
    },
  });

  if (!data) {
    notFound();
  }
  return data;
}

type Params = Promise<{
  id: string;
}>;

const Page = async ({ params }: { params: Params }) => {
  const { id } = await params;
  const data = await getData(id);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      {/* Author Info */}
      <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
        {data.authorImage && (
          <Image
            src={data.authorImage}
            alt={data.authorName}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div>
          <p className="font-medium">{data.authorName}</p>
          <p>{new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Blog Image */}
      {data.imagUrl && (
        <div className="mb-6">
          <Image
            src={data.imagUrl}
            alt={data.title}
            width={800}
            height={450}
            className="rounded-lg object-cover"
            priority
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none mb-8">
        {data.content || 'No content available.'}
      </div>

      {/* Back Link */}
      <Link
        className="inline-block text-blue-600 hover:underline"
        href={`/dashboard`}
      >
        ← Back to posts
      </Link>
    </div>
  );
};

export default Page;
