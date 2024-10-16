import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface User {
  id: string
  name: string
  email: string
}

interface UserListProps {
  users: User[]
  onUserSelect: (user: User) => void
}

export function UserList({ users, onUserSelect }: UserListProps) {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-2">
        {users.map((user) => (
          <Button
            key={user.id}
            variant="outline"
            className="w-full justify-start"
            onClick={() => onUserSelect(user)}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{user.name}</span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}