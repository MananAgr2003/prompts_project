import { connectToDB } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/prompt";

export const GET  = async(req , res) => {

    try{
        await connectToDB();

        const response1 = await Prompt.find({}).populate("creator");
        return new Response(JSON.stringify(response1) , {status : 201});
     
        
    }
    catch(error){
        console.log(error)

    }
}