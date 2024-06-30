import mongoose from 'mongoose'
let connected=false
const connectDB= async ()=>{
    mongoose.set('strictQuery',true)
    if(connected){
    console.log('MongoDB is allready connected ')
  return
}
try{
 await mongoose.connect(process.env.MONGODB_URL)
connected =true
console.log('MongoDB connected....')
}
catch (error){
    console.log(error)
}
}

export default connectDB