import mongoose from 'mongoose'

const ApiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  endpoint: { type: String, required: true },
  method: { type: String, required: true, enum: ['GET', 'POST', 'PUT', 'DELETE'] },
  description: { type: String, required: true },
})

export default mongoose.models.Api || mongoose.model('Api', ApiSchema)