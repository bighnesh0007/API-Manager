import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import ApiKeyModel from '@/models/ApiKeyModel'

export async function GET() {
  await dbConnect()
  const apiKeys = await ApiKeyModel.find({})
  return NextResponse.json(apiKeys)
}

export async function POST(request: Request) {
  await dbConnect()
  const data = await request.json()
  const newApiKey = new ApiKeyModel(data)
  await newApiKey.save()
  return NextResponse.json(newApiKey)
}

export async function DELETE(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  await ApiKeyModel.findByIdAndDelete(id)
  return NextResponse.json({ message: 'API key deleted successfully' })
}