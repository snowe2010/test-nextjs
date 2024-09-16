'use client'

import React, { useState, useMemo, useEffect } from 'react'
import yaml from 'js-yaml'
import './global.css'

type ImageType = {
  src: string;
  alt: string;
  name: string;
  colors: string[];
  continent: string;
  side: string;
};

export default function Component() {
  const [images, setImages] = useState<ImageType[]>([])
  const [selectedColorFilters, setSelectedColorFilters] = useState<string[]>([])
  const [selectedContinentFilters, setSelectedContinentFilters] = useState<string[]>([])
  const [selectedSideFilters, setSelectedSideFilters] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch('/test-nextjs/imageConfig.yaml')
        const yamlText = await response.text()
        const config = yaml.load(yamlText) as { images: ImageType[] }
        setImages(config.images)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to load configuration:', error)
        setIsLoading(false)
      }
    }

    loadConfig()
  }, [])

  const colorFilters = useMemo(() => {
    const allColors = images.flatMap(img => img.colors)
    return Array.from(new Set(allColors)).sort()
  }, [images])

  const continentFilters = useMemo(() => {
    const allContinents = images.map(img => img.continent)
    return Array.from(new Set(allContinents)).sort()
  }, [images])

  const sideFilters = useMemo(() => {
    const allSides = images.flatMap(img => img.side)
    console.dir(allSides);
    return Array.from(new Set(allSides)).sort()
  }, [images])

  const handleColorFilterChange = (filter: string) => {
    setSelectedColorFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const handleContinentFilterChange = (filter: string) => {
    setSelectedContinentFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const handleSideFilterChange = (filter: string) => {
    setSelectedSideFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const filteredImages = useMemo(() => {
    return images.filter(image => 
      (selectedColorFilters.length === 0 || selectedColorFilters.every(filter => image.colors.includes(filter))) &&
      (selectedContinentFilters.length === 0 || selectedContinentFilters.includes(image.continent)) &&
      (selectedSideFilters.length === 0 || selectedSideFilters.every(filter => image.side.includes(filter)))
    )
  }, [selectedColorFilters, selectedContinentFilters, selectedSideFilters, images])

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Geoguessr Bollard Findr</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Colors</h2>
          <div className="space-y-2">
            {colorFilters.map(filter => (
              <div key={filter} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`color-${filter}`}
                  checked={selectedColorFilters.includes(filter)}
                  onChange={() => handleColorFilterChange(filter)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor={`color-${filter}`} className="text-gray-700">{filter}</label>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mt-4 mb-4">Continent</h2>
          <div className="space-y-2">
            {continentFilters.map(filter => (
              <div key={filter} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`continent-${filter}`}
                  checked={selectedContinentFilters.includes(filter)}
                  onChange={() => handleContinentFilterChange(filter)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor={`continent-${filter}`} className="text-gray-700">{filter}</label>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-semibold mt-4 mb-4">Side</h2>
          <div className="space-y-2">
            {sideFilters.map(filter => (
              <div key={filter} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`side-${filter}`}
                  checked={selectedSideFilters.includes(filter)}
                  onChange={() => handleSideFilterChange(filter)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor={`side-${filter}`} className="text-gray-700">{filter}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-3/4 bg-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.map((image, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={process.env.NEXT_PUBLIC_ASSET_PREFIX + "bollards" + image.src}
                  alt={image.alt}
                  className="w-fit mx-auto h-48 object-cover"
                />
                <div className="p-2 text-center">
                  <p className="font-semibold">{image.name}</p>
                  <p className="text-sm text-gray-500">Colors: {image.colors.join(', ')}</p>
                  <p className="text-sm text-gray-500">Continent: {image.continent}</p>
                  <p className="text-sm text-gray-500">Side: {image.side}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Debugging Information:</h2>
        <p>Number of images: {images.length}</p>
        <p>Number of filtered images: {filteredImages.length}</p>
        <p>Selected color filters: {selectedColorFilters.join(', ') || 'None'}</p>
        <p>Selected continent filters: {selectedContinentFilters.join(', ') || 'None'}</p>
        <p>Selected side filters: {selectedSideFilters.join(', ') || 'None'}</p>
      </div>
    </div>
  )
}