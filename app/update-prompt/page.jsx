"use client";
import { useState  , useEffect} from "react";
import { useSession } from "next-auth/react";
import { useRouter , useSearchParams } from "next/navigation";

import Form from "@components/Form";
function EditPrompt() {

    const router = useRouter();
    const {data : session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const searchParams =  useSearchParams();
  const promptId = searchParams.get('id');

  useEffect(()=> {

    const getExistingPrompt = async() => {

        try {

            const response = await fetch(`/api/prompt/${promptId}`)

            const data = await response.json();

            setPost({
                prompt : data.prompt,
                tag : data.tag
            });
            
        } catch (error) {

            console.log(error)
            
        }


    }

    getExistingPrompt();

  }, [promptId])

  const editPrompt = async(e) => {

    e.preventDefault();

    setSubmitting(true);

    if(!promptId) return alert("Prompt ID Not Found");

    try {

        const response = await fetch(`/api/prompt/${promptId}` ,{
            method:"PATCH",
            body: JSON.stringify({
                prompt: post.prompt,
               
                tag: post.tag

            })
        })

        if(response.ok){
            router.push('/')
        }
        
    } catch (error) {

        console.log(error);
        
    } finally{
        setSubmitting(false);
    }

  }


  return (
    <>
      <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={editPrompt}></Form>
    </>
  );
}

export default EditPrompt;
