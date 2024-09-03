'use client'

import React, { useState, useMemo, useEffect } from 'react'
import yaml from 'js-yaml'

type ImageType = {
  src: string;
  alt: string;
  name: string;
  colors: string[];
};

export default function Component() {
  const [images, setImages] = useState<ImageType[]>([])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
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

  const filters = useMemo(() => {
    const allColors = images.flatMap(img => img.colors)
    return Array.from(new Set(allColors)).sort()
  }, [images])

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const filteredImages = useMemo(() => {
    if (selectedFilters.length === 0) return images
    return images.filter(image => 
      selectedFilters.every(filter => image.colors.includes(filter))
    )
  }, [selectedFilters, images])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Geoguessr Bollard Findr</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <h2 className="text-2xl font-semibold mb-4">Filter</h2>
          <div className="space-y-2">
            {filters.map(filter => (
              <div key={filter} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={filter}
                  checked={selectedFilters.includes(filter)}
                  onChange={() => handleFilterChange(filter)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor={filter} className="text-gray-700">{filter}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredImages.map((image, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <img
                  src={"bollards" + image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2 text-center">
                  <p className="font-semibold">{image.name}</p>
                  <p className="text-sm text-gray-500">Colors: {image.colors.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Debugging Information:</h2>
        <p>Number of images: {images.length}</p>
        <p>Number of filtered images: {filteredImages.length}</p>
        <p>Selected filters: {selectedFilters.join(', ') || 'None'}</p>
      </div>
    </div>
  )
}