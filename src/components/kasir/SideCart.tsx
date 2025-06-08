// File: components/kasir/SideCart.tsx
'use client'

import { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

import Keranjang from './Keranjang'
import { CartItem } from '@/app/kasir/page'

interface Props {
  items: CartItem[]
  onUpdateQty: (id: string, newQty: number) => void
  onRemoveItem: (id: string) => void
}

export default function SideCart({
  items,
  onUpdateQty,
  onRemoveItem,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="fixed bottom-4 right-4 z-50 p-4 bg-cyan-600 rounded-full shadow-lg text-white lg:hidden"
          title="Buka Keranjang"
        >
          <ShoppingCart size={24} />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80 p-4">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-cyan-600 mb-4">
            🛒 Keranjang
          </SheetTitle>
        </SheetHeader>

        <Keranjang
          items={items}
          onUpdateQty={onUpdateQty}
          onRemoveItem={onRemoveItem}
          onClearCart={() => {}}
        />
      </SheetContent>
    </Sheet>
  )
}
