import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";
export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();

    const user = await User.findOne({_id : userId});

    let username = user.username;
   

    console.log(username)

    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
      username
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed To Create New Prompt" , {status : 500})
  }
};
