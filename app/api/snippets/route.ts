import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import SnippetModel from '@/models/SnippetModel'

export async function GET() {
  await dbConnect()
  const snippets = await SnippetModel.find({}).sort({ createdAt: -1 })
  return NextResponse.json(snippets)
}

export async function POST(request: Request) {
  await dbConnect()
  const data = await request.json()
  const newSnippet = new SnippetModel(data)
  await newSnippet.save()
  return NextResponse.json(newSnippet)
}

export async function PUT(request: Request) {
  await dbConnect()
  const data = await request.json()
  const { _id, ...updateData } = data
  const updatedSnippet = await SnippetModel.findByIdAndUpdate(_id, updateData, { new: true })
  return NextResponse.json(updatedSnippet)
}

export async function DELETE(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  await SnippetModel.findByIdAndDelete(id)
  return NextResponse.json({ message: 'Snippet deleted successfully' })
}