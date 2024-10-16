import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import ApiModel from '@/models/ApiModel'

export async function GET(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = 10
  const search = searchParams.get('search') || ''

  const query = search
    ? { $or: [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }] }
    : {}

  const totalApis = await ApiModel.countDocuments(query)
  const totalPages = Math.ceil(totalApis / limit)

  const apis = await  ApiModel.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 })

  return NextResponse.json({ apis, totalPages })
}

export async function POST(request: Request) {
  await dbConnect()
  const data = await request.json()
  const newApi = new ApiModel(data)
  await newApi.save()
  return NextResponse.json(newApi)
}

export async function PUT(request: Request) {
  await dbConnect()
  const data = await request.json()
  const { _id, ...updateData } = data
  const updatedApi = await ApiModel.findByIdAndUpdate(_id, updateData, { new: true })
  return NextResponse.json(updatedApi)
}

export async function DELETE(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  await ApiModel.findByIdAndDelete(id)
  return NextResponse.json({ message: 'API deleted successfully' })
}