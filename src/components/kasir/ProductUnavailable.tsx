// File: components/kasir/ProductUnavailable.tsx
import React from 'react'

export default function ProductUnavailable({ message }: { message: string }) {
  return (
    <div className="w-full text-center py-20">
      <p className="text-gray-500">{message}</p>
    </div>
  )
}
