import { Api } from '../models/Api'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DashboardProps {
  apis: Api[]
}

export function Dashboard({ apis }: DashboardProps) {
  const methodCounts = apis.reduce((acc, api) => {
    acc[api.method] = (acc[api.method] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(methodCounts).map(([method, count]) => ({ method, count }))

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total APIs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{apis.length}</div>
        </CardContent>
      </Card>
      {Object.entries(methodCounts).map(([method, count]) => (
        <Card key={method}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{method} APIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count}</div>
          </CardContent>
        </Card>
      ))}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>API Methods Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}