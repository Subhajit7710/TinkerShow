import mongoose,{schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
  {
username:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},
email:{type:String,required:true,unique:true,lowercase:true,trim:true},
fullname:{type:String,required:true,trim:true,index:true},
avatar:{type:String /*cloudnary service*/,required:true},
coverimage:{type:String},
watchhistory:[{type:schema.Types.ObjectID,ref:"Video"}],
password:{type:String,required:[true,"password is required"]},
refreshToken:{type:String}

},{timestamps:true})


userSchema.pre("save",async function(next)
{
  if(this.isModified("password"))
  {
 this.password = bcrypt.hash(this.password,10)
 next()
  }
  else{
    return next();      
  }
})


userSchema.methods.isPasswordCorrect = async function(password)
{
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken =function()
{
  jwt.sign(
    {
      _id:this._id,
      _email:this.email,
      _username:this.username,
      _fullname:this.fullname,

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.generateRefreshToken=function(){
wt.sign(
    {
      _id:this._id,
      
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}


export const User = mongoose.model("User",userSchema)