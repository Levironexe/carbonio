'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts'
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
  country: {
    value: string;
  };
}

// Fixed interface for passing props
interface BarChartLabelComparedToWorldProps {
  emissionsData: EmissionsDataItem[];
  countryName: string;
}

// Mock world data - in a real app, you'd fetch this
const WORLD_EMISSIONS: Record<string, number> = {
  '2023': 39023,
  '2022': 38246,
  '2021': 38121,
  '2020': 36154,
  '2019': 38066,
  '2018': 37974,
  '2017': 37047,
  '2016': 36423,
  '2015': 36300,
};

export function BarChartLabelComparedToWorld({ 
  emissionsData, 
  countryName 
}: BarChartLabelComparedToWorldProps) {
  // Process the emissions data for the chart
  const chartData = [...emissionsData]
    .filter(item => item.value) // Filter out items with no value
    .sort((a, b) => parseInt(a.date) - parseInt(b.date)) // Sort by date (ascending)
    .map(item => ({
      year: item.date,
      countryEmission: item.value,
      worldEmission: WORLD_EMISSIONS[item.date] || 0,
      // Calculate country's percentage of world emissions
      percentage: ((item.value / (WORLD_EMISSIONS[item.date] || 1)) * 100).toFixed(1)
    }));



  const countryDisplayName = countryName || emissionsData[0]?.country.value || 'Selected Country';
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-white">Carbon Emissions: {countryDisplayName} vs World</CardTitle>
        <CardDescription className="text-white">CO₂ emissions in Mt CO₂e by year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
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
              
                formatter={(value, name) => {
                  if (name === countryDisplayName) {
                    return [`${value.toLocaleString()} Mt`, `${countryDisplayName}`];
                  }
                  return [`${value.toLocaleString()} Mt`, `World`];
                }}
              />
              <Legend />
              <Bar 
                name={countryDisplayName} 
                dataKey="countryEmission" 
                className='fill-purple-700'
                fill='#7e22ce'
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                name="World" 
                dataKey="worldEmission" 
                className='fill-white'
                fill='white'
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      <div className="text-white font-medium leading-none">
          Historical carbon emissions data between {countryDisplayName} to World
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