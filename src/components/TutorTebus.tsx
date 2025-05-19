"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TutorTebus() {
  return (
    <Accordion
      type="single"
      collapsible
      className="border border-cyan-300 rounded-lg"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="bg-cyan-500 text-white px-4 py-2">
          Cara Menebus Resep
        </AccordionTrigger>
        <AccordionContent className="bg-white px-4 py-4">
          <h2 className="font-bold mb-2">Cara Menebus Resep</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                1
              </div>
              <span>lorem ipsum</span>
            </li>
            <li className="flex items-start">
              <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                1
              </div>
              <span>lorem ipsum</span>
            </li>
            <li className="flex items-start">
              <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3">
                1
              </div>
              <span>lorem ipsum</span>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
