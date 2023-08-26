import mongoose, { Schema, model, models } from "mongoose";


const PromptSchema = new Schema({

    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    prompt:{
        type:String,
        required:[true , 'Prompt Is Required']
    },

    tag:{
        type: String,
        required:[true , 'Tag is Required']
    },
    username:{
        type: String,
        required: [true , 'Username is required']
    }

});

const Prompt = models.Prompt || model('Prompt' , PromptSchema );

export default Prompt;