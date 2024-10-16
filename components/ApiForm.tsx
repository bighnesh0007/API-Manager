import { useState, useEffect } from 'react'
import { Api } from '../models/Api'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, CardFooter } from "@/components/ui/card"

interface ApiFormProps {
  api: Api
  onSubmit: (api: Api) => void
  isEditing: boolean
}

export function ApiForm({ api, onSubmit, isEditing }: ApiFormProps) {
  const [currentApi, setCurrentApi] = useState<Api>(api)

  useEffect(() => {
    setCurrentApi(api)
  }, [api])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(currentApi)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <Input
            id="name"
            value={currentApi.name}
            onChange={(e) => setCurrentApi({ ...currentApi, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="endpoint" className="text-sm font-medium">Endpoint</label>
          <Input
            id="endpoint"
            value={currentApi.endpoint}
            onChange={(e) => setCurrentApi({ ...currentApi, endpoint: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="method" className="text-sm font-medium">Method</label>
          <Select
            value={currentApi.method}
            onValueChange={(value) => setCurrentApi({ ...currentApi, method: value as Api['method'] })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <Textarea
            id="description"
            value={currentApi.description}
            onChange={(e) => setCurrentApi({ ...currentApi, description: e.target.value })}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">{isEditing ? 'Update' : 'Add'} API</Button>
      </CardFooter>
    </form>
  )
}