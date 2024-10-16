import { Snippet } from "@/models/Snippet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

interface SnippetListProps {
  snippets: Snippet[]
  onEdit: (snippet: Snippet) => void
  onDelete: (id: string) => void
}

export function SnippetList({ snippets, onEdit, onDelete }: SnippetListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Snippets</CardTitle>
        <CardDescription>Your collection of code snippets.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {snippets.map((snippet) => (
            <Collapsible key={snippet._id}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex w-full justify-between">
                  <span>{snippet.title}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 space-y-2">
                  <p><strong>Language:</strong> {snippet.language}</p>
                  <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                    <code>{snippet.code}</code>
                  </pre>
                  {snippet.description && (
                    <p><strong>Description:</strong> {snippet.description}</p>
                  )}
                  <div className="flex justify-end space-x-2 mt-2">
                    <Button variant="outline" onClick={() => onEdit(snippet)}>Edit</Button>
                    <Button variant="destructive" onClick={() => onDelete(snippet._id || '')}>Delete</Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}