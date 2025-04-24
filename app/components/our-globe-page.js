'use client'
import { useState, useEffect } from 'react';
import Globe from './ui/globe';
import { BarChartLabel } from './ui/barchart-label';
import { BarChartLabelComparedToWorld } from './ui/barchart-label-compared-with-world';
import EmissionsDisplay from './emission-display';
import Link from 'next/link';

const ShowData = () => {
  const [emissionsData, setEmissionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [buttonIsClick, setButtonIsClick] = useState(false);
  const [coordinator, setCoordinator] = useState('');

  const countryCoordinates = {
    'US': [37.0902, -95.7129],  // United States
    'CN': [35.8617, 104.1954],  // China
    'IN': [20.5937, 78.9629],   // India
    'RU': [61.5240, 105.3188],  // Russia
    'JP': [36.2048, 138.2529],  // Japan
    'DE': [51.1657, 10.4515],   // Germany
    'GB': [55.3781, -3.4360],   // United Kingdom
    'FR': [46.2276, 2.2137],    // France
    'BR': [-14.2350, -51.9253], // Brazil
    'CA': [56.1304, -106.3468], // Canada
  };

  const countries = [
    { code: 'US', name: 'United States'},
    { code: 'CN', name: 'China' },
    { code: 'IN', name: 'India' },
    { code: 'RU', name: 'Russia' },
    { code: 'JP', name: 'Japan' },
    { code: 'DE', name: 'Germany' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
    { code: 'BR', name: 'Brazil' },
    { code: 'CA', name: 'Canada' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.worldbank.org/v2/country/${selectedCountry}/indicator/EN.GHG.CO2.MT.CE.AR5?format=json&date=2015:2023`
        );
        const data = await response.json();
        
        if (data && data[1]) {
          setEmissionsData(data[1]);
          setError(null);
        } else {
          setEmissionsData([]);
          setError('No data available');
        }
      } catch (err) {
        setError('Failed to fetch emissions data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCountry]);
  console.log(`Selected country code: ${selectedCountry}`)
  return (
    <div className="w-full mx-auto">
      <div className='w-full bg-gradient-to-r from-black to-carbon border-t-2 border-b-2 border-black  p-2  sm:p-4 md:p-6 px-4 sm:px-6 md:px-10'>

      
      <div className='mx-auto max-w-6xl flex justify-between items-end gap-8 mb-12'>
        <div className="flex-[2] py-4">
          <div className='mb-6'>
            <h1 className="text-3xl font-bold text-white">Carbon dioxide (CO2) emissions (total) excluding LULUCF (Mt CO2e)</h1>
            <Link className=' text-sm text-white hover:text-purple-500 hover:underline' href={"https://data.worldbank.org/indicator/EN.GHG.CO2.MT.CE.AR5?end=2023&most_recent_value_desc=true&start=1970&view=chart"}>
              visit WORLD BANK GROUP 
            </Link>
          </div>

          <div className="mb-6">
            <label htmlFor="country" className="block text-xl  font-bold mb-2  text-white">
              Select Country:
            </label>
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="border-2 border-carbon rounded p-2 w-full max-w-xs bg-white text-black"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p>Loading emissions data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4  text-white">
                CO2 Emissions for <span className='bg-white text-purple-700 px-2 py-1 rounded'> {emissionsData[0]?.country.value || selectedCountry}</span>
              </h2>
              
              <div className="overflow-x-auto rounded">
                <table className="min-w-full  border-t border-white  text-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b  text-left">Year</th>
                      <th className="py-2 px-4 border-b text-left">Emissions (Mt CO2e)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emissionsData.map((item) => (
                      <tr key={item.date}>
                        <td className="py-2 px-4 border-b">{item.date}</td>
                        <td className="py-2 px-4 border-b">
                          {item.value ? item.value.toLocaleString() : 'No data'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className='flex-[2]  py-4'>
          <Globe selectedCountry={selectedCountry}  marker={countryCoordinates[selectedCountry]}/>
        </div>
      </div>
      <div className='mx-auto max-w-6xl'>
        <div className='w-fit flex rounded border-2'>
          <button onClick={() => setButtonIsClick(false)} className={`transition-all duration-200 ${!buttonIsClick? "text-purple-700 bg-white p-2 " : "text-white bg-black p-2"}`}>Carbon emission</button>
          <button onClick={() => setButtonIsClick(true)} className={`transition-all duration-200 ${buttonIsClick? "text-purple-700 bg-white p-2 " : "text-white bg-black p-2"}`}>Carbon emission compared to World</button>
        </div>
        {!buttonIsClick ? (<BarChartLabel emissionsData={emissionsData}/>) : 
            (<BarChartLabelComparedToWorld 
            emissionsData={emissionsData} 
            countryName={emissionsData[0]?.country.value}
          />
        )}
        
      </div>
      </div>
      <EmissionsDisplay countryCode={selectedCountry}/>

    </div>
  );
}

export default ShowData