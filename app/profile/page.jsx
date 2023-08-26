"use client"
import {useState ,  useEffect} from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'
import { Router } from 'next/router'
export default function Profile1() {

    const router =  useRouter();

    const {data : session } = useSession();
    const [posts , setPosts] = useState([])

    useEffect(() => {
        if (session?.user?.id) {
          const fetchPosts = async () => {
            try {
              const response = await fetch(`/api/users/${session.user.id}/posts`);
              const data = await response.json();
              setPosts(data);
            } catch (error) {
              console.error('Error fetching posts:', error);
            }
          };
    
          fetchPosts();
        }
      }, [session]);

    const handleEdit = (post) => {

       router.push(`/update-prompt?id=${post._id}`)

    }

    const handleDelete = async (post) => {
      router.push(`/delete-prompt?id=${post._id}`)


    }
  return (
    <Profile
    name="My"
    desc="Welcome To Your Personalized profile Page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}></Profile>
  )
}
