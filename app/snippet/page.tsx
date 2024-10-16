'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Toaster } from "@/components/ui/toaster"
import { SnippetList } from "@/components/SnippetList"
import { Snippet } from "@/models/Snippet"
import { useToast } from "@/hooks/use-toast"


const LANGUAGES = [
  "JavaScript", "Python", "Java", "C++", "Ruby", "Go", "Rust", "TypeScript", "PHP", "Swift"
]

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [currentSnippet, setCurrentSnippet] = useState<Snippet>({ title: '', code: '', language: '', description: '' })
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchSnippets()
  }, [])

  const fetchSnippets = async () => {
    try {
      const response = await fetch('/api/snippets')
      if (!response.ok) {
        throw new Error('Failed to fetch snippets')
      }
      const data = await response.json()
      setSnippets(data)
    } catch (error) {
      console.error('Error fetching snippets:', error)
      toast({
        title: "Error",
        description: "Failed to fetch snippets. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/snippets', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentSnippet)
      })
      if (!response.ok) {
        throw new Error('Failed to save snippet')
      }
      setCurrentSnippet({ title: '', code: '', language: '', description: '' })
      setIsEditing(false)
      fetchSnippets()
      toast({
        title: "Success",
        description: `Snippet ${isEditing ? 'updated' : 'added'} successfully.`,
      })
    } catch (error) {
      console.error('Error saving snippet:', error)
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'add'} snippet. Please try again.`,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (snippet: Snippet) => {
    setCurrentSnippet(snippet)
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/snippets?id=${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete snippet')
      }
      fetchSnippets()
      toast({
        title: "Success",
        description: "Snippet deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting snippet:', error)
      toast({
        title: "Error",
        description: "Failed to delete snippet. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Code Snippet Manager</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Snippet' : 'Add New Snippet'}</CardTitle>
            <CardDescription>Enter the details of the code snippet you want to save.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={currentSnippet.title}
                  onChange={(e) => setCurrentSnippet({ ...currentSnippet, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={currentSnippet.language}
                  onValueChange={(value) => setCurrentSnippet({ ...currentSnippet, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Code</Label>
                <Textarea
                  id="code"
                  value={currentSnippet.code}
                  onChange={(e) => setCurrentSnippet({ ...currentSnippet, code: e.target.value })}
                  required
                  className="font-mono"
                  rows={10}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={currentSnippet.description}
                  onChange={(e) => setCurrentSnippet({ ...currentSnippet, description: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">{isEditing ? 'Update' : 'Add'} Snippet</Button>
            </CardFooter>
          </form>
        </Card>

        <SnippetList
          snippets={snippets}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <Toaster />
    </div>
  )
}