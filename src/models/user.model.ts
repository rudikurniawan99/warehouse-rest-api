import { Document, model, Schema } from 'mongoose'
import argon from 'argon2'

export interface UserDocument extends Document{
  name: string
  email: string
  password: string
  verifyPassword: (pass: string) => Promise<boolean>
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 8
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function(next) {
  let user = this as UserDocument
  if(!user.isModified('password')){
    next()
  }
  const hash = await argon.hash(user.password)
  user.password = hash
  next()
})

userSchema.methods.verifyPassword = async function(pass: string): Promise<boolean>{
  const user = this as UserDocument
  try {
    return await argon.verify(user.password, pass) 
  } catch (e) {
    return false 
  }
}

const User = model<UserDocument>('User', userSchema)
export default  User