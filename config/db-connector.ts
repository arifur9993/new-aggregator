import mongoose, { Mongoose } from "mongoose"

const connStat: {
  isConnected: number
} = {
  isConnected: 99,
}

let connection: Mongoose
if (connStat.isConnected !== 1) {
  connection = await mongoose.connect(process.env.MONGODB_URI!, { connectTimeoutMS: 30000 })
  connStat.isConnected = connection.connections[0].readyState
}

export { connection as mongoose }
