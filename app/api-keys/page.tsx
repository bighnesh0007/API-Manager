'use client'

import { useState, useEffect } from 'react'
import { Api } from '@/models/Api'
import { ApiKey } from '@/models/ApiKey'
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiForm } from "@/components/ApiForm"
import ApiList  from "@/components/ApiList"
import { Dashboard } from "@/components/Dashboard"
import { ApiKeyManager } from "@/components/ApiKeyManager"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"


export default function ApiManager() {
  const [apis, setApis] = useState<Api[]>([])
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [currentApi, setCurrentApi] = useState<Api>({ name: '', endpoint: '', method: 'GET', description: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { setTheme, theme } = useTheme()
  const { toast } = useToast()

  useEffect(() => {
    fetchApis()
    fetchApiKeys()
  }, [currentPage, searchTerm])

  const fetchApis = async () => {
    try {
      const response = await fetch(`/api/apis?page=${currentPage}&search=${searchTerm}`)
      if (!response.ok) {
        throw new Error('Failed to fetch APIs')
      }
      const data = await response.json()
      setApis(data.apis)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error fetching APIs:', error)
      toast({
        title: "Error",
        description: "Failed to fetch APIs. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/apikeys')
      if (!response.ok) {
        throw new Error('Failed to fetch API keys')
      }
      const data = await response.json()
      setApiKeys(data)
    } catch (error) {
      console.error('Error fetching API keys:', error)
      toast({
        title: "Error",
        description: "Failed to fetch API keys. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (api: Api) => {
    try {
      const response = await fetch('/api/apis', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(api)
      })
      if (!response.ok) {
        throw new Error('Failed to save API')
      }
      setCurrentApi({ name: '', endpoint: '', method: 'GET', description: '' })
      setIsEditing(false)
      fetchApis()
      toast({
        title: "Success",
        description: `API ${isEditing ? 'updated' : 'added'} successfully.`,
      })
    } catch (error) {
      console.error('Error saving API:', error)
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? 'update' : 'add'} API. Please try again.`,
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/apis?id=${id}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Failed to delete API')
      }
      fetchApis()
      toast({
        title: "Success",
        description: "API deleted successfully.",
      })
    } catch (error) {
      console.error('Error deleting API:', error)
      toast({
        title: "Error",
        description: "Failed to delete API. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (api: Api) => {
    setCurrentApi(api)
    setIsEditing(true)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">API Manager</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="mb-8">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="manage">Manage APIs</TabsTrigger>
          <TabsTrigger value="apikeys">API Keys</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Dashboard apis={apis} />
        </TabsContent>
        <TabsContent value="manage">
          <div className="grid gap-8 md:grid-cols-2">
            <ApiForm api={currentApi} onSubmit={handleSubmit} isEditing={isEditing} />
            <ApiList
              apis={apis}
              onEdit={handleEdit}
              onDelete={handleDelete}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </TabsContent>
        <TabsContent value="apikeys">
          <ApiKeyManager apiKeys={apiKeys} onApiKeysChange={fetchApiKeys} />
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}