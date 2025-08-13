"use client"
import React from 'react'
import { Card,CardDescription,CardTitle,CardHeader, CardContent } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { handleSubmission } from '@/app/actions'
import SubmitButton from '@/app/components/general/SubmitButton'

const CreateBlogRoute = () => {

  return (
    <Card className='w-full max-w-lg mx-auto mt-10'>
      <CardHeader>
        <CardTitle>Create New Blog</CardTitle>
        <CardDescription>Fill in the details below to create a new blog post.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Form for creating a new blog post will go here */}
        <form action={handleSubmission}  className="space-y-4">
          <div className="flex flex-col gap-2">
           <Label className="block text-sm font-medium mb-2">Title</Label>
           <Input name='title' required  className="w-full" type="text" placeholder="Enter blog title" />
          </div>
          <div className="flex flex-col gap-2">
             <Label className="block text-sm font-medium mb-2">Content</Label>
           <Textarea name='content' required className="w-full mt-4" placeholder="Write your blog content here..." rows={6} />  
          </div>
          <div className="flex flex-col gap-2">
             <Label className="block text-sm font-medium mb-2">Image Url</Label>
           <Input name='imageUrl' className="w-full mt-4" placeholder="Enter url"  />  
          </div>
          <SubmitButton/>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateBlogRoute