import React from 'react'
import { Skeleton } from '../ui/skeleton'

const SkeletonHistory = () => {
    return (
        <div className="space-y-4">
            <div className="border rounded-lg p-4 flex flex-col gap-4 shadow-sm bg-white">
                <Skeleton className="w-40 h-4" />
                <div className="flex items-start gap-4">
                    <Skeleton className="w-[100px] h-[100px] rounded object-contain" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="w-3/4 h-4" />
                        <Skeleton className="w-1/2 h-3" />
                        <Skeleton className="w-20 h-3" />
                    </div>
                    <div className="text-right space-y-2">
                        <Skeleton className="w-24 h-5 ml-auto" />
                        <Skeleton className="w-16 h-6 ml-auto rounded-full" />
                    </div>
                </div>
            </div>
        </div>)
}

export default SkeletonHistory