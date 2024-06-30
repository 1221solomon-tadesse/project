import { Schema,model, models } from "mongoose" 
import React from 'react'

const PropertiesSchema= new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    location:{
   street:{
    type:String
   },
   city:{
    type:String
   },
   state:{
    type:String
   },
   zipcode:{
    type:String
   }},
  beds:{
    type:Number,
    required:true
},
baths:{
    type:Number,
    required:true
},
squear_feet:{
    type:Number,
    required:true
},
amenities:[
    {
        type:String
    }
],
rates:{
    nightly:{
        type:Number
    },
    weekly:{
        type:Number
    },
    monthly:{
        type:Number
    }},
    seller_info:{
        name:{
            type:String
        },
      email:{
            type:String
        },
        phono:{
            type:String
        }},
       images:[{
            type:String
        },
    ],
    is_featured:{
        type:Boolean,
        default:false
    }
    }) 
    const Property=models.Property|| model('User','UserSchema')
    export default Property

   