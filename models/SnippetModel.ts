import mongoose from 'mongoose'

const SnippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
}, { timestamps: true })

export default mongoose.models.Snippet || mongoose.model('Snippet', SnippetSchema)