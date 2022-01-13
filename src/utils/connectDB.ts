import mongoose from 'mongoose'


const db_uri = String(process.env.MONGODB_URI) 

const connectDB = async () => {
  try {
    await mongoose.connect(db_uri, {
      dbName: process.env.DB_NAME
    }, () => {
      console.log('connect to db ....');
      
    }) 
  } catch (e) {
    console.log(e) 
  }

  mongoose.connection.on('disconnected', () => {
    console.log('mongoose connection is disconnected');
  })
}

export default connectDB