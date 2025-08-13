import React from "react";
import Counter from "@/app/components/Counter";

type Params = Promise<{
    slug: string;
}>;

export const Slug = async ({ params }: {params:Params}) => {
  const { slug } = await params;

  return <div>Hello from the slug: {slug}
    {/* <Counter/> */}
  </div>;
};

export default Slug;
