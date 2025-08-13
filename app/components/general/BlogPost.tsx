"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

interface BlogCardProps {
  id: string;
  title: string;
  content: string | null;
  imageUrl?: string | null;
  authorName?: string | null;
  createdAt?: string;
  authorImage?: string | null;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  content,
  imageUrl,
  authorName,
  createdAt,
  authorImage,
}) => {
  const router = useRouter();

  return (
    <div
      key={id}
      onClick={() => router.push(`/post/${id}`)} // Navigate to blog details
      className="p-4 w-full border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-gray-700 line-clamp-3">{content}</p>

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={300}
          className="w-full h-48 object-cover mt-2 rounded"
        />
      )}

      <div className="flex items-center gap-3 mt-4">
        {authorImage && (
          <Image
            src={authorImage}
            alt={authorName || "Author"}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        )}
        <div className="text-sm text-gray-500">
          <p>By {authorName || "Unknown"}</p>
          {createdAt && <p>{new Date(createdAt).toLocaleDateString()}</p>}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
