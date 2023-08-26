"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

function PromptCard({ post, handletagClick, handleEdit, handleDelete }) {

  const {data : session}  = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const [copied2, setCopied2] = useState("/assets/icons/copy.svg");
  const handleCopy = () => {

    setCopied2("/assets/icons/tick.svg")
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied("", 3000));
    // setTimeout(() => setCopied2("/assets/icons/copy.svg", 5000));
  };

  useEffect(()=>{

    setTimeout(() => {

    setCopied2("/assets/icons/copy.svg")


    }, 3000)

  } , [copied2])
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user"
            width={40}
            height={40}
            className="rounded.full object-contain"
          ></Image>

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter font-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>

          <div className="copy_btn" onClick={handleCopy}>
            <Image src={copied2} width={12} height={12} alt="copy" />
          </div>
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handletagClick && handletagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient curson-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient curson-pointer" onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
