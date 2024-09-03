'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'

type ImageType = {
  src: string;
  alt: string;
  name: string;
  colors: string[];
};

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filters = ['black', 'red', 'white', 'blue', 'yellow']
  
  const images: ImageType[] = [
    { src: '/bollard_314.jpg', alt: 'Italy', name: 'italy', colors: ['red', 'white', 'green'] },
    { src: '/bollard_314.jpg', alt: 'France', name: 'france', colors: ['blue', 'white', 'red'] },
    { src: '/bollard_314.jpg', alt: 'Britain', name: 'britain', colors: ['red', 'white', 'blue'] },
    { src: '/bollard_314.jpg', alt: 'Germany', name: 'germany', colors: ['black', 'red', 'yellow'] },
    { src: '/bollard_314.jpg', alt: 'Poland', name: 'poland', colors: ['white', 'red'] },
    { src: '/bollard_314.jpg', alt: 'Croatia', name: 'croatia', colors: ['red', 'white', 'blue'] },
  ]

  const handleFilterChange = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  const filteredImages = useMemo(() => {
    if (selectedFilters.length === 0) return images;
    return images.filter(image => 
      selectedFilters.every(filter => image.colors.includes(filter))
    );
  }, [selectedFilters, images]);

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
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2 text-center">
                  <p className="font-semibold">{image.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}