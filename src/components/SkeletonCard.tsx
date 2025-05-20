import React from 'react'
import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'

const SkeletonCard = () => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="p-4 flex flex-col items-center gap-2">
                    <div className="w-full flex justify-end">
                        <Skeleton className="w-5 h-5 rounded-full" />
                    </div>
                    <Skeleton className="w-20 h-20 rounded-md mb-2 bg-gray-200" />
                    <Skeleton className="w-16 h-3 bg-gray-200" />
                    <Skeleton className="w-24 h-4 bg-gray-200" />
                    <Skeleton className="w-20 h-4 mb-2 bg-gray-200" />
                    <div className="flex w-full gap-2 mt-auto">
                        <Skeleton className="flex-1 h-8 rounded-md bg-gray-200" />
                        <Skeleton className="w-8 h-8 rounded-md bg-gray-200" />
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default SkeletonCard