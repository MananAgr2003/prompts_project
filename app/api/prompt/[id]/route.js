import { connectToDB } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/prompt";

export const GET  = async(req , {params}) => {

    try{
        await connectToDB();

        const response1 = await Prompt.findById((
        params.id
        )).populate("creator");

        if(!response1) return new Response("Prompt Not Found" , { status:404});
        return new Response(JSON.stringify(response1) , {status : 201});
     
        
    }
    catch(error){
        console.log(error)

    }
}


export const PATCH = async(req , {params}) => {
  
    const {prompt , tag } = await req.json();


    try {

        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("No Such Prompt Found" , {status : 404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt) , {status : 200});

        
    } catch (error) {

        return new Response("Failed To Update" , {status : 500});
        


    }

}

export const DELETE = async(req , {params}) => {



    try {

        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        
        return new Response("Prompt Deleted", {status : 200});
        
    } catch (error) {
        return new Response("Failed To Delete" , {status : 500});
        
    }
}