import { useState } from 'react'
import { ApiKey } from '../models/ApiKey'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import { Eye, EyeOff, Copy } from "lucide-react"

interface ApiKeyManagerProps {
  apiKeys: ApiKey[]
  onApiKeysChange: () => void
}

export function ApiKeyManager({ apiKeys, onApiKeysChange }: ApiKeyManagerProps) {
  const [newApiKey, setNewApiKey] = useState<Omit<ApiKey, '_id'>>({ name: '', key: '', type: '' })
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/apikeys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApiKey)
      })
      if (!response.ok) {
        throw new Error('Failed to add API key')
      }
      setNewApiKey({ name: '', key: '', type: '' })
      onApiKeysChange()
      toast({
        title: "Success",
        description: "API key added successfully.",
      })
    } catch (error) {
      console.error('Error adding API key:', error)
      toast({
        title: "Error",
        description: "Failed to add API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/apikeys?id=${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete API key')
      }
      onApiKeysChange()
      toast({
        title: "Success",
        description: "API key deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting API key:', error)
      toast({
        title: "Error",
        description: "Failed to delete API key. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleShowKey = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: "API key copied to clipboard.",
    })
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Add New API Key</CardTitle>
          <CardDescription>Enter the details of the API key you want to store.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input
                id="name"
                value={newApiKey.name}
                onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="key" className="text-sm font-medium">API Key</label>
              <Input
                id="key"
                type="password"
                value={newApiKey.key}
                onChange={(e) => setNewApiKey({ ...newApiKey, key: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium">Type</label>
              <Input
                id="type"
                value={newApiKey.type}
                onChange={(e) => setNewApiKey({ ...newApiKey, type: e.target.value })}
                placeholder="e.g., Website, AI Model"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Add API Key</Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stored API Keys</CardTitle>
          <CardDescription>List of all stored API keys.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey._id}>
                  <TableCell>{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Input
                        type={showKeys[apiKey._id] ? "text" : "password"}
                        value={apiKey.key}
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleShowKey(apiKey._id)}
                      >
                        {showKeys[apiKey._id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(apiKey.key)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{apiKey.type}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete(apiKey._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}