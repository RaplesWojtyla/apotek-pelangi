"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Keranjang from "./Keranjang"; 
import { ShoppingCartIcon } from "lucide-react";
import { useState } from "react";


import { CartItem } from '@/app/kasir/page'; 


const CartSidebar = ({
    items,
    onUpdateQty,
    onRemoveItem
}: {
    items: CartItem[];
    onUpdateQty: (id: string, newQty: number) => void;
    onRemoveItem: (id: string) => void;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile Button */}
            <div className="lg:hidden fixed top-4 right-4 z-50">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            className="bg-cyan-600 text-white rounded-full p-3 shadow-lg"
                            onClick={() => setOpen(true)}
                        >
                            <ShoppingCartIcon className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="p-4 w-full max-w-sm">
                        <SheetHeader>
                            <SheetTitle>🛒 Keranjang</SheetTitle>
                        </SheetHeader>
                        {/* Pass the received props down to Keranjang */}
                        <Keranjang
                            items={items}
                            onUpdateQty={onUpdateQty}
                            onRemoveItem={onRemoveItem}
                        />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block flex-shrink-0">
                <aside className="lg:fixed top-[56px] right-0 w-[400px] min-h-screen bg-white border-l shadow-md max-h-[calc(100vh-4.5rem)] overflow-y-auto z-40">
                    <div className="p-4 h-full">
                        <h2 className="text-2xl font-bold mb-4 text-cyan-600">🛒 Keranjang</h2>
                        {/* Pass the received props down to Keranjang */}
                        <Keranjang
                            items={items}
                            onUpdateQty={onUpdateQty}
                            onRemoveItem={onRemoveItem}
                        />
                    </div>
                </aside>
            </div>
        </>
    );
};

export default CartSidebar;