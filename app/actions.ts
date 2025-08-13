"use server";
import { redirect } from "next/navigation";
import prisma from "./utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function handleSubmission(formData: FormData) {
     const { getUser } = await getKindeServerSession();
     const user = await getUser();

     if(!user){
        return redirect("/api/auth/register");
     }

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imagUrl = formData.get("imageUrl") as string;
    const authorId = user?.id || "",
    authorImage = user?.picture || "";

     await prisma.blogPost.create({
        data: {
            title,
            content,
            imagUrl,
            authorId,
            authorImage,
            authorName: user?.given_name || "Anonymous",
        },
    })
    return redirect("/dashboard");
}