import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string;
}

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, status: 'Pending' | 'In Progress' | 'Completed') => void;
}

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set())

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'In Progress':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'Completed':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev => {
      const newSet = new Set(prev)
      if (newSet.has(taskId)) {
        newSet.delete(taskId)
      } else {
        newSet.add(taskId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task._id} className="transition-shadow hover:shadow-md">
          <CardHeader className="cursor-pointer" onClick={() => toggleTaskExpansion(task._id)}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <Badge className={`${getStatusColor(task.status)} text-white`}>{task.status}</Badge>
            </div>
          </CardHeader>
          {expandedTasks.has(task._id) && (
            <>
              <CardContent>
                <CardDescription>{task.description}</CardDescription>
                <p className="mt-2 text-sm text-gray-600">Assigned to: {task.assignedTo}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`complete-${task._id}`}
                    checked={task.status === 'Completed'}
                    onCheckedChange={() => onTaskUpdate(task._id, task.status === 'Completed' ? 'In Progress' : 'Completed')}
                  />
                  <label 
                    htmlFor={`complete-${task._id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mark as {task.status === 'Completed' ? 'Incomplete' : 'Complete'}
                  </label>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => onTaskUpdate(task._id, task.status === 'Pending' ? 'In Progress' : 'Pending')}
                >
                  {task.status === 'Pending' ? 'Start' : 'Pause'}
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      ))}
    </div>
  )
}