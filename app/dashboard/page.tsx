'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskList } from "@/components/TaskList"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string;
}

export default function UserDashboard() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [tasks, setTasks] = useState<Task[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchTasks()
    }
  }, [isLoaded, isSignedIn])

  const fetchTasks = async () => {
    try {
      if (!user) {
        throw new Error('User is not defined')
      }
      const response = await fetch(`/api/tasks?userId=${user.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch tasks')
      }
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      toast({
        title: "Error",
        description: "Failed to fetch tasks. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTaskUpdate = async (taskId: string, status: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (!response.ok) {
        throw new Error('Failed to update task')
      }
      const updatedTask = await response.json()
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === updatedTask._id ? updatedTask : task
        )
      )
      toast({
        title: "Success",
        description: "Task updated successfully.",
      })
    } catch (error) {
      console.error('Error updating task:', error)
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">User Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Tasks</CardTitle>
          <CardDescription>View and manage your assigned tasks.</CardDescription>
        </CardHeader>
        <CardContent>
          <TaskList tasks={tasks} onTaskUpdate={handleTaskUpdate} />
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}