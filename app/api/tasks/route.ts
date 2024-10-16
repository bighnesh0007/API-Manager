import { NextResponse } from 'next/server'
import dbConnect from '@/lib/dbConnect'
import TaskModel from '@/models/TaskModel'

export async function GET(request: Request) {
  await dbConnect()
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
  }

  try {
    const tasks = await TaskModel.find({ assignedTo: userId })
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  await dbConnect()
  const data = await request.json()

  try {
    const newTask = new TaskModel(data)
    await newTask.save()
    return NextResponse.json(newTask)
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 })
  }
}