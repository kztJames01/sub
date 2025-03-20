import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const BarChartComponent = ({ chartData }: { chartData: any }) => {
    return (
        <Card className="mb-6">
            <CardHeader>
              <CardTitle>Monthly Subscription Cost vs Average</CardTitle>
              <CardDescription>Comparison of individual subscription costs with the average monthly cost.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="cost" fill="var(--chart-1)" radius={4} />
                  <Bar dataKey="average" fill="var(--chart-2)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    )
}

export default BarChartComponent;