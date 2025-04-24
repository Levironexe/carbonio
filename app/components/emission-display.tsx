'use client'
'use client'
import React, { useState, useEffect } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import Link from 'next/link'

const registryData = 
{
  "US_2015": "G9Tv63fzoUxH47SidwRPEV4UwoG3xekTn61LRZ2EHv84",
  "CN_2015": "436G51BVwaSAy6VihyDXimB3By4iK8gZZ8EdEnEbrj6z",
  "IN_2015": "AnCcftVeicnAMh3uLkhc421gBnMkyWJXaEot3yqLCcAi",
  "JP_2015": "DSNENP74daaB3e4gwr64Awqezo5tp4k3DVTpunq2Ccm9",
  "RU_2015": "BGpuJGpevymcX3WZaDi5K9zXguBa9o7s2UF231H5LJnf",
  "DE_2015": "C64PWANaXQee9NzNBzq96JRSViomWbso6HKYAQRLN4JY",
  "GB_2015": "B8LCwqyFYY1y1itfGfJbGWsvniTwCyPwCLJB2uAW9cAt",
  "FR_2015": "75XHttt8TNsLV95b5xaGYukunJe3TEBcuJ9X8Qo8dmUx",
  "BR_2015": "DaS5woGkkPDr3M47Wvn4gekY4K9bS1ja6gKoYpTz3VZ9",
  "CA_2015": "H1HXZZfYtVv6AUVnnM1vAVPYbSYm1hFRc8h9A6syg7Vi",
  "US_2016": "Eg77MDfSZs41tykWW5h7BAn9dB66DzQTU9P2wSMJA1NP",
  "CN_2016": "AvvehNxaNR7hgAg5vmfRgZH5bhZ4XrkeoBtRKDhkvNzZ",
  "IN_2016": "6TXcTDGqcpMeNBfmUZzy9c9iGZ2UWH3T3MS8xfXfCuJ3",
  "JP_2016": "DMZu7dFuJ4fsZDJ8JU2GfUfp4vfxsvTxGJZ3e3bgXMVj",
  "RU_2016": "9poHD3Wfuv3cJdEVKiTngS1MUB48qDGtSBw9DadFgANv",
  "DE_2016": "HwAjFqe8qxKcqhp3SfxS3LZ4UwcaUqJxHuKT4weU6pss",
  "GB_2016": "23b2LfgfVvyTkdMsCBjccKXHN5La1TPacwNb2RTXpRBb",
  "FR_2016": "6ZKdjkNrGS5szExJeCbee77hpqZnkE4Y9P9CouoYC75r",
  "BR_2016": "EcUkBJaSVCPc73q3CJrp1d67VJmHje8sG82PbuxR2fV5",
  "CA_2016": "HYvNZyvu2YxE6an1iZeq6Xd3SrUgsw3zCa6itBG6qGEq",
  "US_2017": "881XAUD2BByNMZ3qoGzNQA3hBk8w1eqLjxUo6J7cFrSd",
  "CN_2017": "HtohTjy18S6gdYBEHPoQP2iKHxFnvGsYq2HjgFqgETTv",
  "IN_2017": "6jSorw9kek9dAsacyD4R9cXAZB6RwNW8F56UpBXcba31",
  "JP_2017": "5r4BmTbo3J4hfkh42zSZz1hvZNdbRLYy3319cYVXQVrC",
  "RU_2017": "93LVfNGeoSR7RQZoVE2bewhbMXF6KBbuwXjtmjNVQzyA",
  "DE_2017": "2aCYHfGMewjKK36iHgtDa59bvVguvbYkcrhZvTHy69Bj",
  "GB_2017": "8yAkGnRQyqkYorLnnG8nV9wNDE5FFi9fBD7YLXLvyTpA",
  "FR_2017": "55k9FnjPFiMXoLt7owZaCtrVzYCdJErqMgZxWNRfwiFM",
  "BR_2017": "CFq5kfkqY2cwMJMtUkaevqoj5HBZRtC7ejwVQf3DCvUa",
  "CA_2017": "EnHgZxPbG9h78o5zAQDeqVSjUEd7PisEPBiB8rUxUgj",
  "US_2018": "7CNE3yAsbnzpZBDisLz4yn3gbjCXTcLnx9RA1RhUCMg1",
  "CN_2018": "3sSH3cf7wCnXcSxWnqwCYEwAt6EHE6saTPLJEH4mYJnw",
  "IN_2018": "5SS2Fto9aUnVEnXn8VioSVDDcZ6oArn2tF9QnSMnP4d4",
  "JP_2018": "uLTD9akSix56kb6e3Ro9iiNimtbXtEjgsDo2RbDTD2V",
  "RU_2018": "rXfJUsupRPgv5XS2Nuymiji1ebERQVopryYojaEAaJ3",
  "DE_2018": "6Q4L9n42ZHt1Qk8XYSpv5x5drLydzpk9a5GP9gMBB6do",
  "GB_2018": "HZHdPrT3Ro8arJ2Dp5pMQsQCgwpKAKe9yeGXdMuLj4tJ",
  "FR_2018": "4nsa5vR2E41GRXi3T9jvc7kTJcvLTPdR17pfzhPRyWt3",
  "BR_2018": "DZFRppxKVXbgWegwDsPzEx5KxuFK61WRLR3zhEvDzCDh",
  "CA_2018": "2hZKMyjDrRKR3H9Cj5CKa8WQY7So7vDqf22jzcPjrcw1",
  "US_2019": "Chfci8nfNeJJ8YfatPo5b5By4TyC1vM5jF5HbKnPJbqb",
  "CN_2019": "33f6pgaebrUKhBLdfsSEwir3Qo54pLk768J4XVBrb4kN",
  "IN_2019": "9xmS9wQKvNjxNqnCgCcrCWDCuMupfK2rjsP42dmURXKR",
  "JP_2019": "AHCTQGHjk3QZi12pRWyMCzbRHKSfppS8fUdwmg8UGwQ9",
  "RU_2019": "E6BiNbJCcWDAR782Sned7e2s63Ptwp8DAb5CnT1NgaZd",
  "DE_2019": "7m6MgDiKdrdGKRENzokpykJpPR8gQsPNhJDga6FDhKtg",
  "GB_2019": "F6MpBZJT1FiBn6heKJZjuepfTpzKrhD2zGEfPLpGf9mQ",
  "FR_2019": "4LBjn8XFWfMet3ky4Goydj9WN8vx5FyCS4P7HQDHTx45",
  "BR_2019": "5fi587Z9F7Vtqs8zre39VarmEzumYtP2XCBLiAUtGMeq",
  "CA_2019": "EjTbgFrWJUbzdPyVjgBLEyxyw1gPm8wP9xEwM4A96uPJ",
  "US_2020": "BCuVCuAiRXEUKdxkLYexScWy8LYHtqDuX5hkPe7VH6dr",
  "CN_2020": "FBTPrL9CKJCdokYVheUD3g2MnahJeKeJ1dxdguCpFZQY",
  "IN_2020": "E8SAc6nAZKeaeVKMYgQNezEcDVkLFvRpXQpVhvpNkDSM",
  "JP_2020": "4bKN4zjthtqxzgyisM7TYpWYqbaEeQUm3rpmiuGtYURY",
  "RU_2020": "8zqCtQF8jFQyUvZsRw3LPSoLXBTqz9519hp9eUZgystG",
  "DE_2020": "83zMQwPHQdTC9GkgtFyfUnn5iQ34yofPUwKBsaPSjNYm",
  "GB_2020": "GZS8pfEKtbuPJdsjrpyaN22n8xMgZiKzexGLpkjZdEaf",
  "FR_2020": "Gkh1wFpJpvxHQr26y1Vx3LMzWabU6hDEJrskqu9ovPbD",
  "BR_2020": "BrASPZNxmN78qqwx8Em532fWSJD8854BXxnKWDYoiC8x",
  "CA_2020": "DJMr7rLWx1U8YogpKoTRShXGrBib41nifsJ5YQL8LqS",
  "US_2021": "AvfUZ3BYNsUxirZkuZyEuY3Y9HHZiA7HFswYtGu6brHf",
  "CN_2021": "3cvfwFHVKVQa7nF5fStnDy32av2PfgZFAdbFtUA6pye2",
  "IN_2021": "3SoMb5Gsbvyp3VM7rmJS5v7KrwisTLwP4KqtJ6gvTSb7",
  "JP_2021": "FJzaBqqmp7bCexGSFRrHykDML5Aup9g5rFwPqMkZ5fjb",
  "RU_2021": "HsFKsJKFT85PozhnAFrBCqWxhdUrTAxbtTxTdF6yks3F",
  "DE_2021": "DcZ7mRQn6owVoYpWC4wVbdnxEWxGZ9xFnDVFevYaFa7b",
  "GB_2021": "532ocmP6FWxXJfiwamTqgn9Eb46ypnYV4sQnMg2m2ShT",
  "FR_2021": "HRPTFE7cZ8i4woCDdDCZJ3wk3eU3ByiXzxFVnMRSgcK4",
  "BR_2021": "EZRPcVNfe8NgU7bKYH4FBNVhEZ2YjxAhM58FzCE251Dy",
  "CA_2021": "GLwYQUghG49rw51fNPkz2atTb6omNmajeeeuWWf8GJ7F",
  "US_2022": "26r166HzkUaSnVGpKmviZ1AdBVBxcnAe5AJ7VnhzHdKH",
  "CN_2022": "2VBCrDLh9wc1T7NUbcrhaVbDruzKaHEVFUZPYWrVGJzk",
  "IN_2022": "GLWCnMVE7tC1e1vrYManTzRijkuqUZ6a82ZTwCuyeJLx",
  "JP_2022": "5VaQhQC98hogbhRs8jR96QGeRMYro4Nps199sW6S37sS",
  "RU_2022": "GeAD42fdaKWrA87VUPT4GZQjQEJhjm6tGceqsq9ezhbH",
  "DE_2022": "BHKgqtLPSbZUjDqv4VjR87PWuQyUmTqKGxWJhGMnbe4h",
  "GB_2022": "3SNvYwR3mjMqH69ExjaRpa2db5v4FJvWqC4F1txyFN5x",
  "FR_2022": "DZhBWuo8m9CW8W9APG9oTSSU21axFRrgvap6mMHDhYzK",
  "BR_2022": "CqdD8pMyqftvuTGnVDieDWXDP6VPwkUtpbpnNsf1R1VE",
  "CA_2022": "gRNMee9jCzBrVPYvtfFCY3Ba8vUqxVa4W9q5bidnw31",
  "US_2023": "CAvDkceCPNPu91pCT1VCgLAiUGXYijzmaZc5Nw8xj6yM",
  "CN_2023": "58QHJ5CM3yjBXtNY6T7kzahabq4SyQzxfLSQysXvYJnV",
  "IN_2023": "4CCTDfrEc8a5dF7Sk2p1tLrxmcBPUcpwQ1wvTreSBPGt",
  "JP_2023": "3wQZdigpsAy6vNyKKgfYHZnYTFairz7PtnGweGmWKjW2",
  "RU_2023": "zA1xcMtuBNZKxPqLYitXy8VfSmSAq2AUoTfTjb7sgXq",
  "DE_2023": "5TZdkwSHVYWGdjy9es2z2DwmxTu46BgSUBygVTgpg98J",
  "GB_2023": "3W95R6Ub9uqbHVwNtSoQe7TiQw4pRXQuXrhz2ThgiBmT",
  "FR_2023": "99RNmJyYiLscEF4z68m8V1n9gh4DD58ADr4MTJ7yzhky",
  "BR_2023": "HXZCDGWTR5984NNKieRy9yGWFXHmjgMn6woCPU7CB4gn",
  "CA_2023": "73htGth3dQw2rj7TdncQh29hKPamNZSqpBKUehnyP5Qw"
}

type RegistryData = Record<string, string>

async function fetchRawJson(accountAddress: string): Promise<string> {
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed')
  const pubkey = new PublicKey(accountAddress)
  const info = await connection.getAccountInfo(pubkey)
  if (!info) throw new Error('Account not found')

  const data = info.data
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength)
  const strLen = view.getUint32(0, true)
  const jsonBytes = data.slice(4, 4 + strLen)
  return new TextDecoder().decode(jsonBytes)
}

/**
 * Component to display emissions account addresses for a given country code.
 * Accepts a single country code string.
 */
export default function EmissionsDisplay({ countryCode }: { countryCode: string }) {
  // Normalize to an array for consistent mapping
  const codes = [countryCode]

  const [registry, setRegistry] = useState<RegistryData>({})
  const [rawJson, setRawJson] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedKey, setSelectedKey] = useState<string>('')

  // Load registry once
  useEffect(() => {
    setRegistry(registryData)
  }, [])

  // Fetch account data when a specific key is selected
  useEffect(() => {
    if (!selectedKey) return

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchRawJson(registry[selectedKey])
      .then(json => { if (!cancelled) setRawJson(json) })
      .catch(err => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [selectedKey, registry])

  return (
    <div className="h-fit text-black  p-2  sm:p-4 md:p-6 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-4 font-semibold text-center">Solana Blockchain reference</h1>

        {/* Display each country code (in this case, just one) */}
        {codes.map(code => {
          // Filter registry for entries matching this code
          const entries = Object.entries(registry)
            .filter(([key]) => key.startsWith(`${code}_`))
            .sort((a, b) => {
              const yearA = parseInt(a[0].split('_')[1])
              const yearB = parseInt(b[0].split('_')[1])
              return yearA - yearB
            })

          return (
            <div key={code} className="mb-6">
              <h2 className="text-xl mb-8  text-center">country: <span className='font-bold'>{code}</span> </h2>

              <div className='w-full flex justify-start gap-24 items-center pb-4'>
                <div className='text-black text-lg font-bold'>Year</div>
                <div className='text-base font-bold'>Emission account address</div>
              </div>
              {entries.map(([key, address]) => {
                const year = key.split('_')[1]
                const isSelected = selectedKey === key

                return (
                  <div key={key} className="py-4 border-t-2">
                    <div className="flex justify-between items-center">
                      <div className='flex justify-between items-center gap-24'>
                      <span className="font-bold text-lg">{year}</span>
                      <Link target='_blank' href={`https://explorer.solana.com/address/${address}?cluster=devnet`}>
                        <span className="text-base break-all hover:underline hover:text-purple-700 transition-colors duration-200">{address}</span>
                      </Link>
                        </div>
                     
                      <div className='group relative'>
                        <div className="absolute inset-0 bg-carbon transition-all duration-300 group-hover:-bottom-1 group-hover:-right-1 rounded-[4px]"></div>
                          <button
                            className="relative bg-white px-3 py-1 border-2 border-carbon text-black rounded"
                            onClick={() => {
                              setSelectedKey(key)
                              setRawJson(null)
                            }}>
                            View Details
                          </button>
                        </div>   
                      </div>

                    {isSelected && (
                      <div className="mt-2 ">
                        {loading && <p className='text-black text-center'>Loading…</p>}
                        {error && <p className="text-red-500 text-center">Error: {error}</p>}
                        {!loading && !error && rawJson && (
                          <pre className="p-2 bg-gray-100 rounded overflow-auto whitespace-pre-wrap text-xs text-center">
                            {rawJson}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
