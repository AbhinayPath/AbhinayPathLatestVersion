import type { Metadata } from "next"
import ProductionBackstageContent from "@/components/production-backstage-content"

export const metadata: Metadata = {
  title: "Technical & Production Artists | Abhinayपथ",
  description: "Meet the skilled technical and production artists of the Abhinayपथ community",
}

export default function ProductionBackstagePage() {
  return <ProductionBackstageContent />
}
