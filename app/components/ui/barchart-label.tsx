'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"

// Interface for the input emissions data
interface EmissionsDataItem {
  date: string;
  value: number;
}

export function BarChartLabel({ emissionsData }: { emissionsData: EmissionsDataItem[] }) {
  // Transform data for chart display
  const chartData = [...emissionsData]
    .filter(item => item.value) // Filter out items with no value
    .sort((a, b) => parseInt(a.date) - parseInt(b.date)) // Sort by date ascending
    .map(item => ({
      year: item.date,
      emissions: item.value
    }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-white">Carbon Emissions</CardTitle>
        <CardDescription className="text-white">Mt CO2e by Year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={true}
              />
              <YAxis 
                tickLine={false}
                axisLine={true}
                tickFormatter={(value) => `${(value/1000).toFixed(1)}k`}
              />
              <Tooltip
                formatter={(value) => [`${value.toLocaleString()} Mt`, 'Emissions']}
              />
              <Bar 
                name="CO2 Emissions" 
                dataKey="emissions" 
                className="fill-white hover:fill-purple-700 transition-colors duration-100" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-white font-medium leading-none">
          Historical carbon emissions data
        </div>
        <div className="text-white leading-none">
          Source: 
          <Link 
            target="_blank" 
            href={'https://data.worldbank.org/indicator/EN.GHG.CO2.MT.CE.AR5'} 
            className="ml-2 underline hover:text-purple-700 transition-all duration-200"
          >
            World Bank Climate Data
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}