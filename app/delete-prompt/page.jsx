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



        deletePrompt();

  }, [])

  const deletePrompt = async() => {


    setSubmitting(true);

    if(!promptId) return alert("Prompt ID Not Found");

    try {

        const response = await fetch(`/api/prompt/${promptId}` ,{
            method:"DELETE",
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
      
    </>
  );
}

export default EditPrompt;
