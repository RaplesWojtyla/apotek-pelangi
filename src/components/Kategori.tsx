import {
  Hand,
  Thermometer,
  Droplet,
  Mic,
  Pill,
  Activity,
  Baby,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Alergi", icon: Hand },
  { name: "Demam", icon: Thermometer },
  { name: "Diabetes", icon: Droplet },
  { name: "Mulut & THT", icon: Mic },
  { name: "Vitamin & Suplemen", icon: Pill },
  { name: "Hipertensi", icon: Activity },
  { name: "Kesehatan Ibu/Anak", icon: Baby },
];

export default function Kategori() {
  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Kategori</h2>
          <a href="#" className="text-sm text-cyan-700 hover:underline">
            Lihat Semua
          </a>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="h-32 flex flex-col items-center justify-center p-4 cursor-pointer hover:shadow-md transition"
              >
                <CardContent className="flex flex-col items-center justify-center gap-2 p-0">
                  <Icon className="w-12 h-12 text-cyan-700" />
                  <span className="text-xs text-gray-700 text-center">
                    {category.name}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
