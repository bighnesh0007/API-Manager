'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserList } from "@/components/UserList"
import { TaskAssignmentForm } from "@/components/TaskAssignmentForm"
import {  Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"


export default function AdminDashboard() {
  const { isLoaded, isSignedIn } = useUser()
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string } | null>(null)
  const { toast } = useToast()
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchUsers()
    }
  }, [isLoaded, isSignedIn])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please log in.')
        }
        throw new Error('Failed to fetch users')
      }
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to fetch users. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUserSelect = (user: { id: string; name: string }) => {
    setSelectedUser(user)
  }

  const handleTaskAssign = async (taskData: { title: string; description: string }) => {
    if (!selectedUser) {
      toast({
        title: "Error",
        description: "No user selected. Please select a user to assign the task.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...taskData, assignedTo: selectedUser.id })
      })
      if (!response.ok) {
        throw new Error('Failed to assign task')
      }
      toast({
        title: "Success",
        description: "Task assigned successfully.",
      })
      setSelectedUser(null)
    } catch (error) {
      console.error('Error assigning task:', error)
      toast({
        title: "Error",
        description: "Failed to assign task. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>Select a user to assign a task.</CardDescription>
          </CardHeader>
          <CardContent>
            <UserList users={users} onUserSelect={handleUserSelect} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assign Task</CardTitle>
            <CardDescription>Create and assign a task to the selected user.</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedUser ? (
              <TaskAssignmentForm onAssign={handleTaskAssign} selectedUser={selectedUser} />
            ) : (
              <p>Please select a user from the list to assign a task.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}