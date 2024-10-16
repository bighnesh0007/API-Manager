import mongoose from 'mongoose'

const ApiKeySchema = new mongoose.Schema({
  name: { type: String, required: true },
  key: { type: String, required: true },
  type: { type: String, required: true },
})

export default mongoose.models.ApiKey || mongoose.model('ApiKey', ApiKeySchema)